const asyncHandler = require("express-async-handler");
const Farm = require("../models/farmModel");

//role: owner, worker
const getFarms = asyncHandler(async (req, res) => {
  let farm;

  farm = await Farm.find({ owners: { $in: req.user.id } });
  if (!farm) {
    farm = await Farm.find({ workers: { $in: req.user.id } });
  }

  res.status(200).json(farm);
});

//role: owner
const setFarm = asyncHandler(async (req, res) => {
  const farm = await Farm.create({
    name: req.body.name,
    creator: req.user.id,
    owners: [req.user.id],
  });

  res.status(200).json(farm);
});

//role: owner
const updateFarm = asyncHandler(async (req, res) => {
  const farm = await Farm.create({
    name: req.body.name,
    owners: [req.user.id],
  });

  res.status(200).json(farm);
});

//role: owner
const deleteFarm = asyncHandler(async (req, res) => {
  const farm = await Farm.create({
    name: req.body.name,
    owners: [req.user.id],
  });

  res.status(200).json(farm);
});

module.exports = {
  getFarms,
  setFarm,
  updateFarm,
  deleteFarm,
};
