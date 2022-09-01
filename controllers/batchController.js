const asyncHandler = require("express-async-handler");
const Batch = require("../models/batchModel");

const getBatches = asyncHandler(async (req, res) => {
  // TODO: add authentication

  // const batches = await Batch.find().populate("tasks materials harvests");
  const batches = await Batch.find().populate({
    path: "materials.material",
  });

  res.status(200).json(batches);
});

const setBatch = asyncHandler(async (req, res) => {
  const { activePhase, active, materials } = req.body;

  if (!materials) {
    res.status(200);
    throw new Error("Materials Required");
  }

  const batches = await Batch.find({});

  const batch = await Batch.create({
    owner: req.user.id,
    farm: req.user.farm,
    active: true,
    activePhase: "composting",
    name: batches.length + 1,
    materials: materials,
    composting: {
      moisture: 0,
      period: null,
      mixFrequency: 0,
    },
    bagging: {
      bagWeight: 0,
      total: 0,
      defects: 0,
    },
    sterilization: {
      duration: null,
      defects: 0,
    },
    inoculation: {
      spawn: "",
      total: 0,
      defects: 0,
    },
    fruiting: {
      waiting: null,
      defects: 0,
    },
  });

  res.status(200).json(batch);
});

const updateBatch = asyncHandler(async (req, res) => {
  //find batch
  const batch = await Batch.findById(req.params.id);

  if (req.user.role == "worker") {
    res.status(400);
    throw new Error("Role not able to update");
  }

  if (!batch) {
    res.status(400);
    throw new Error("Batch not found");
  }

  if (!req.user) {
    res.status(400);
    throw new Error("User not found");
  }

  if (batch.owner.toString() !== req.user.id) {
    res.status(400);
    throw new Error("User not authorized");
  }

  const updatedBatch = await Batch.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedBatch);
});

const deleteBatch = asyncHandler(async (req, res) => {
  const batch = await Batch.findById(req.params.id);

  if (!batch) {
    res.status(400);
    throw new Error("Batch not found");
  }

  if (!req.user) {
    res.status(400);
    throw new Error("User not found");
  }

  if (batch.owner.toString() !== req.user.id) {
    res.status(400);
    throw new Error("User not authorized");
  }

  await batch.remove();

  res.status(200).json({
    message: "Deleted Batch " + req.params.id,
  });
});

module.exports = {
  getBatches,
  setBatch,
  updateBatch,
  deleteBatch,
};
