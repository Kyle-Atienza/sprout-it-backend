const asyncHandler = require("express-async-handler");

const Material = require("../models/materialModel");
const Batch = require("../models/batchModel");

const getMaterials = asyncHandler(async (req, res) => {
  const materials = await Material.find();

  res.status(200).json(materials);
});

const postMaterial = asyncHandler(async (req, res) => {
  const { name, unit, price } = req.body;

  const materials = await Material.find();

  const materialExist = materials.find(
    (material) => material.name === name && !material.isDeleted
  );

  if (materialExist) {
    res.status(400);
    throw new Error(
      "Material Already Exist. Please add Quantity on Financials"
    );
  }

  if (!name || !unit) {
    res.status(400);
    throw new Error("Please provide necessary details");
  }

  const material = await Material.create({
    name: req.body.name,
    altName: req.body.altName,
    unit: req.body.unit,
  });
  res.status(200).json(material);
});

const putMaterial = asyncHandler(async (req, res) => {
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
  const material = await Material.findById(req.params.id); //TODO: Change to material

  if (!material) {
    res.status(400);
    throw new Error("material not found");
  }

  await Material.findByIdAndUpdate(
    req.params.id,
    {
      isDeleted: true,
    },
    {
      new: true,
    }
  );

  res.status(200).json({
    message: "Deleted Material " + req.params.id,
  });
});

module.exports = {
  getMaterials,
  setMaterial: postMaterial,
  updateMaterial: putMaterial,
  deleteMaterial,
};
