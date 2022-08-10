const asyncHandler = require("express-async-handler");

const Harvest = require("../models/harvestModel");

const getHarvests = asyncHandler(async (req, res) => {
  const harvests = await Harvest.find();

  res.status(200).json(harvests);
});

const setHarvest = asyncHandler(async (req, res) => {
  const harvest = await Harvest.create({
    date: new Date(new Date().toDateString()),
    weight: req.body.weight,
  });

  res.status(200).json(harvest);
});

const updateHarvest = asyncHandler(async (req, res) => {
  const updatedHarvest = await Harvest.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedHarvest);
});

const deleteHarvest = asyncHandler(async (req, res) => {
  const harvest = await Harvest.findById(req.params.id);

  if (!harvest) {
    res.status(200);
    throw new Error("harvest not found");
  }

  await harvest.remove();

  res.status(200).json({
    message: "Deleted harvest " + req.params.id,
  });
});

module.exports = {
  getHarvests,
  setHarvest,
  updateHarvest,
  deleteHarvest,
};
