const asyncHandler = require("express-async-handler");

const Material = require("../models/materialModel");

const getMaterials = asyncHandler(async (req, res) => {
  const materials = await Material.find();

  res.status(200).json(materials);
});

const setMaterial = asyncHandler(async (req, res) => {
  const material = await Material.create({
    material: req.body.material,
    weight: req.body.weight,
  });

  res.status(200).json(material);
});

const updateMaterial = asyncHandler(async (req, res) => {
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
