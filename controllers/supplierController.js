const asyncHandler = require("express-async-handler");

const Supplier = require("../models/supplierModel");

const getSuppliers = asyncHandler(async (req, res) => {
  const suppliers = await Supplier.find();

  res.status(200).json(suppliers);
});

const setSupplier = asyncHandler(async (req, res) => {
  const { name, address, contact } = req.body;

  if (!name || !address || !contact) {
    res.status(400);
    throw new Error("Please provide necessary details");
  }

  const supplier = await Supplier.create({
    name: name,
    address: address,
    contact: contact,
  });
  res.status(200).json(supplier);
});

const updateSupplier = asyncHandler(async (req, res) => {
  const supplier = await Supplier.findById(req.params.id);

  if (!supplier) {
    res.status(400);
    throw new Error("Supplier does not exist");
  }

  const updatedSupplier = await Supplier.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  );

  res.status(200).json(updatedSupplier);
});

const deleteSupplier = asyncHandler(async (req, res) => {
  const supplier = await Supplier.findById(req.params.id);

  if (!supplier) {
    res.status(400);
    throw new Error("material not found");
  }

  await supplier.remove();

  res.status(200).json({
    id: req.params.id,
  });
});

module.exports = {
  getSuppliers,
  setSupplier,
  updateSupplier,
  deleteSupplier,
};
