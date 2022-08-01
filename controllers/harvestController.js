const asyncHandler = require("express-async-handler");

const getHarvests = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "getHarvests",
  });
});

const setHarvest = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "setHarvest",
  });
});

const updateHarvest = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "updateHarvest",
  });
});

const deleteHarvest = asyncHandler(async (req, res) => {
  res.status(200).json({
    message: "deleteHarvest",
  });
});

module.exports = {
  getHarvests,
  setHarvest,
  updateHarvest,
  deleteHarvest,
};
