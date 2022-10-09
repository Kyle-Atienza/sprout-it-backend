const asyncHandler = require("express-async-handler");
const schedule = require("node-schedule");

const Task = require("../models/taskModel");
const Batch = require("../models/batchModel");
const scheduler = require("../services/schedule");

const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find().populate("batch");

  res.status(200).json(tasks);
});

const setTask = asyncHandler(async (req, res) => {
  const task = await Task.create({
    ...req.body,
    occurrence: 0,
    next:
      req.body.start.by === "date"
        ? new Date(`${req.body.start.on} ${req.body.time}`)
        : null,
  });

  if (task.start.by === "date") {
    scheduler.createSchedule(task);
  }

  res.status(200).json(task);
});

const updateTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  if (req.body.status === "cancel") {
    //cancel task
    schedule.cancelJob(task._id.toString());
  }

  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedTask);
});

const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(404);
    throw new Error("Task not found");
  }

  await task.remove();

  res.status(200).json({
    message: "Deleted Task " + req.params.id,
  });
});

module.exports = {
  getTasks,
  setTask,
  updateTask,
  deleteTask,
};
