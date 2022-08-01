const asyncHandler = require("express-async-handler");

const getTasks = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "getTasks",
  });
});

const setTask = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "setTask",
  });
});

const updateTask = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "updateTask",
  });
});

const deleteTask = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "deleteTask",
  });
});

module.exports = {
  getTasks,
  setTask,
  updateTask,
  deleteTask,
};
