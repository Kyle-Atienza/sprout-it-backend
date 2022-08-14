const asyncHandler = require("express-async-handler");

const Task = require("../models/taskModel");
const Batch = require("../models/batchModel");

const getTasks = asyncHandler(async (req, res) => {
  const { batchId } = req.body;

  // find batch by supplied batch id
  const batch = await Batch.findById(batchId).populate("tasks");
  // check if batch is returned
  if (!batch) {
    res.status(400);
    throw new Error("Batch not found");
  }
  // verify if creator owns the batch
  if (batch.owner.toString() !== req.user.id) {
    res.status(400);
    throw new Error("Unable to modify batch");
  }

  res.status(200).json(batch.tasks);
});

const setTask = asyncHandler(async (req, res) => {
  const { batchId } = req.body;

  // find batch by supplied batch id
  const batch = await Batch.findById(batchId);
  // check if batch is returned
  if (!batch) {
    res.status(400);
    throw new Error("Batch not found");
  }
  // verify if creator owns the batch
  if (batch.owner.toString() !== req.user.id) {
    res.status(400);
    throw new Error("Unable to modify batch");
  }

  const task = await Task.create({
    name: req.body.name,
    frequency: req.body.frequency,
  });

  await Batch.findByIdAndUpdate(
    batch.id,
    {
      tasks: [...batch.tasks, task.id],
    },
    { new: true }
  );

  res.status(200).json(task);
  // res.status(200);
});

const updateTask = asyncHandler(async (req, res) => {
  const { batchId } = req.body;

  // find batch by supplied batch id
  const batch = await Batch.findById(batchId);
  // check if batch is returned
  if (!batch) {
    res.status(400);
    throw new Error("Batch not found");
  }
  // verify if creator owns the batch
  if (batch.owner.toString() !== req.user.id) {
    res.status(400);
    throw new Error("Unable to modify batch");
  }

  const updatedTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedTask);
});

const deleteTask = asyncHandler(async (req, res) => {
  const task = await Task.findById(req.params.id);

  const { batchId } = req.body;

  // find batch by supplied batch id
  const batch = await Batch.findById(batchId);
  // check if batch is returned
  if (!batch) {
    res.status(400);
    throw new Error("Batch not found");
  }
  // verify if creator owns the batch
  if (batch.owner.toString() !== req.user.id) {
    res.status(400);
    throw new Error("Unable to modify batch");
  }

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
