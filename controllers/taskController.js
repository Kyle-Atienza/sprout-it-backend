const asyncHandler = require("express-async-handler");

const Task = require("../models/taskModel");

const { updateBatch } = require("../controllers/batchController");

const getTasks = asyncHandler(async (req, res) => {
  const tasks = await Task.find();

  res.status(200).json(tasks);
});

const setTask = asyncHandler(async (req, res) => {
  const task = await Task.create({
    name: req.body.name,
    frequency: req.body.frequency,
  });

  res.status(200).json(task);
});

const updateTask = asyncHandler(async (req, res) => {
  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedTask);
});

const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(200);
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
