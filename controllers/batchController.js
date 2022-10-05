const dt = require("luxon").DateTime;

const asyncHandler = require("express-async-handler");
const Batch = require("../models/batchModel");
const Material = require("../models/materialModel");

const getBatches = asyncHandler(async (req, res) => {
  // TODO: add authentication

  // const batches = await Batch.find().populate("tasks materials harvests");
  const batches = await Batch.find().populate({
    path: "materials.material harvests",
  });

  res.status(200).json(batches);
});

const getBatch = asyncHandler(async (req, res) => {
  const batch = await Batch.findById(req.params.id).populate({
    path: "materials.material harvests",
  });

  if (!batch) {
    res.status(400);
    throw new Error("Batch not found");
  }

  res.status(200).json(batch);
});

const setBatch = asyncHandler(async (req, res) => {
  const { activePhase, active, materials } = req.body;

  if (!materials) {
    res.status(200);
    throw new Error("Materials Required");
  }

  const batches = await Batch.find({});

  //get all materials
  // check if there is sufficient materials
  const materialIds = await materials.map((material) => material.material);
  const batchMaterials = await Material.find({
    _id: { $in: materialIds },
  });

  const isMaterialsSufficient = !materials.some((material) => {
    return (
      parseFloat(material.weight) >
      batchMaterials.find((batchMaterial) => {
        return material.material === batchMaterial._id.toString();
      }).quantity
    );
  });

  if (!isMaterialsSufficient) {
    res.status(400);
    throw new Error("Insuficcient Materials");
  }

  batchMaterials.forEach(async (batchMaterial) => {
    // update material quantity on create batch
    const updatedQuantity =
      batchMaterial.quantity -
      materials.find((material) => {
        return material.material === batchMaterial._id.toString();
      }).weight;

    await Material.findByIdAndUpdate(
      batchMaterial._id,
      {
        quantity: updatedQuantity,
      },
      { new: true }
    );
  });

  const totalValue = batchMaterials.reduce((prev, currentMaterial) => {
    return (
      prev +
      currentMaterial.price *
        parseFloat(
          materials.find((material) => {
            return material.material === currentMaterial._id.toString();
          }).weight
        )
    );
  }, 0);

  const batch = await Batch.create({
    owner: req.user.id,
    active: true,
    activePhase: "pre",
    name: batches.length + 1,
    materials: materials,
    value: totalValue,
    startedAt: new Date(),
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

  if (req.body.activePhase) {
    // startPhaseJob(phase)
  }

  /* if (batch.owner.toString() !== req.user.id) {
    res.status(400);
    throw new Error("User not authorized");
  } */

  const updatedBatch = await Batch.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
  });

  res.status(200).json(updatedBatch);
});

const updateManyBatch = asyncHandler(async (req, res) => {});

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

const deleteBatchesOnPhase = asyncHandler(async (req, res) => {
  const deletedBatches = await Batch.deleteMany({
    activePhase: req.params.phase,
  });

  res.status(200).json({
    deletedBatches,
  });
});

module.exports = {
  getBatches,
  getBatch,
  setBatch,
  updateBatch,
  deleteBatch,
  deleteBatchesOnPhase,
};
