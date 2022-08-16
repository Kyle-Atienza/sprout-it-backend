const asyncHandler = require("express-async-handler");

const Material = require("../models/materialModel");
const Batch = require("../models/batchModel");

const getMaterials = asyncHandler(async (req, res) => {
  const { batchId } = req.body;

  // find batch by supplied batch id
  const batch = await Batch.findById(batchId).populate("materials");
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

  // const materials = await Material.find();

  res.status(200).json(batch.materials);
});

const setMaterial = asyncHandler(async (req, res) => {
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

  const material = await Material.create({
    material: req.body.material,
    weight: req.body.weight,
  });

  await Batch.findByIdAndUpdate(
    batch.id,
    {
      materials: [...batch.materials, material.id],
    },
    { new: true }
  );

  res.status(200).json(material);
});

const updateMaterial = asyncHandler(async (req, res) => {
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

  const updatedMaterial = await Material.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedMaterial);
});

const deleteMaterial = asyncHandler(async (req, res) => {
  const material = await Material.findById(req.params.id);

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

  if (!material) {
    res.status(200);
    throw new Error("material not found");
  }

  await material.remove();

  res.status(200).json({
    message: "Deleted Material " + req.params.id,
  });
});

module.exports = {
  getMaterials,
  setMaterial,
  updateMaterial,
  deleteMaterial,
};
