const asyncHandler = require("express-async-handler");

const getBatches = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "getBatches",
  });
});

const setBatch = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "setBatch",
  });
});

const updateBatch = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "updateBatch",
  });
});

const deleteBatch = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "deleteBatch",
  });
});

module.exports = {
  getBatches,
  setBatch,
  updateBatch,
  deleteBatch,
};
