const _ = require("lodash");
const schedule = require("node-schedule");
const firebaseAdmin = require("../firebase");

const User = require("../models/userModel");
const Task = require("../models/taskModel");
const taskModel = require("../models/taskModel");

const scheduledTime = (task) => {
  const day = new Date(task.start.on).getDay();
  const hours =
    task.time !== "allDay"
      ? new Date(`${task.start.on} ${task.time}`).getHours()
      : 0;
  const minutes =
    task.time !== "allDay"
      ? new Date(`${task.start.on} ${task.time}`).getMinutes()
      : 0;
  const id = task._id;

  let cron;

  if (task.frequency === "once") {
    cron = ``;
  } else if (task.frequency === "daily") {
    cron = `${minutes} ${hours} * * *`;
  } else if (task.frequency === "weekly") {
    cron = `${minutes} ${hours} * * ${day}`;
  } else if (task.frequency === "monthly") {
    cron = `${minutes} ${hours} ${day} * *`;
  }

  return cron ? cron : new Date(`${task.start.on} ${task.time}`);
};

const updateTask = async (payload, task) => {
  const updatedTask = await Task.findByIdAndUpdate(
    task._id.toString(),
    payload,
    {
      new: true,
    }
  );
  console.log("updated task", updatedTask);
};

const scheduledJob = async (task) => {
  const users = await User.find({});
  const chunks = _.chunk(users, 500);
  const promises = chunks.map(async (chunk) => {
    const tokens = [];
    chunk.forEach((user) => {
      if (user.fcmToken) {
        tokens.push(user.fcmToken);
      }
    });
    const payload = {
      tokens,
      title: task.name,
      body: task.description ? task.description : "",
    };
    return firebaseAdmin
      .sendMulticastNotification(payload)
      .then((response) => console.log(response));
  });
  await Promise.all(promises);

  //update occurence of task
  updateTask(
    {
      occurrence: (task.occurrence += 1),
    },
    task
  );

  //update status of task
  if (task.frequency === "once") {
    updateTask(
      {
        status: "finished",
      },
      task
    );
    schedule.cancelJob(task._id.toString());
    console.log("task finished");
  }

  if (task.end.by === "occurrence") {
    if (task.end.on === task.occurrence) {
      updateTask(
        {
          status: "finished",
        },
        task
      );
      schedule.cancelJob(task._id.toString());
      console.log("task finished");
    }
  }
};

const createSchedule = async (task) => {
  try {
    schedule.scheduleJob(task._id.toString(), scheduledTime(task), async () => {
      scheduledJob(task);
    });
  } catch (error) {
    throw error;
  }
};

const reSchedule = async () => {
  try {
    const tasks = await Task.find({});

    tasks.forEach((task) => {
      if (task.status === "ongoing") {
        schedule.scheduleJob(
          task._id.toString(),
          scheduledTime(task),
          async () => {
            scheduledJob(task);
          }
        );
      }
      if (task.end.by === "date") {
        scheduler.scheduleCancelSchedule(new Date(task.end.on), task._id);
      }
    });
    console.log("tasks rescheduled");
  } catch (error) {
    throw error;
  }
};

const scheduleCancelSchedule = async (scheduledCancel, task) => {
  schedule.scheduleJob(scheduledCancel, () => {
    schedule.cancelJob(task);
  });
};

const getJobs = () => {
  return schedule.scheduledJobs;
};

const scheduler = {
  createSchedule,
  reSchedule,
  getJobs,
  scheduleCancelSchedule,
};

module.exports = scheduler;
