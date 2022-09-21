const _ = require("lodash");
const schedule = require("node-schedule");
const firebaseAdmin = require("../firebase");

const User = require("../models/userModel");
const Task = require("../models/taskModel");
const taskModel = require("../models/taskModel");

const scheduledTime = (task) => {
  const day = new Date(task.next).getDay();
  const date = new Date(task.next).getDate();
  const hours = task.time !== "allDay" ? new Date(task.next).getHours() : 0;
  const minutes = task.time !== "allDay" ? new Date(task.next).getMinutes() : 0;

  let cron;
  let rule;

  if (task.frequency === "once") {
    rule = new Date(task.next);
  } else if (task.frequency === "daily") {
    cron = `${minutes} ${hours} * * *`;
  } else if (task.frequency === "weekly") {
    cron = `${minutes} ${hours} * * ${day}`;
  } else if (task.frequency === "monthly") {
    cron = `${minutes} ${hours} ${date} * *`;
  }

  if (cron && task.end.by !== "date") {
    rule = {
      start: new Date(task.next),
      end: new Date(999999999999999),
      rule: cron,
    };
  }
  if (cron && task.end.by === "date") {
    rule = {
      start: new Date(task.next),
      end: new Date(`${task.end.on}`),
      rule: cron,
    };
  }

  return rule;
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
  console.log(scheduledTime(task));
  const job = schedule.scheduleJob(
    task._id.toString(),
    scheduledTime(task),
    async () => {
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

      console.log("next", new Date(job.nextInvocation()));

      //update occurence of task
      updateTask(
        {
          occurrence: (task.occurrence += 1),
          next: new Date(job.nextInvocation()),
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
    }
  );
};

const createSchedule = async (task) => {
  try {
    scheduledJob(task);
  } catch (error) {
    throw error;
  }
};

const reSchedule = async () => {
  try {
    const tasks = await Task.find({});

    tasks.forEach((task) => {
      if (task.status === "ongoing") {
        scheduledJob(task);
      }
      if (task.end.by === "date") {
        scheduler.scheduleCancelJob(new Date(task.end.on), task._id);
      }
    });
    console.log("tasks rescheduled");
  } catch (error) {
    throw error;
  }
};

const scheduleCancelJob = async (scheduledCancel, task) => {
  schedule.scheduleJob(scheduledCancel, () => {
    schedule.cancelJob(task);
  });
};

/* const scheduleStartJob = async (scheduledStart, task) => {
  schedule.scheduleJob(scheduledStart, () => {
    schedule.cancelJob(task);
  });
}; */

const getJobs = () => {
  return schedule.scheduledJobs;
};

const scheduler = {
  createSchedule,
  reSchedule,
  getJobs,
  scheduleCancelJob,
};

module.exports = scheduler;
