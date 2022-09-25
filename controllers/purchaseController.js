const asyncHandler = require("express-async-handler");

const Purchase = require("../models/purchaseModel");

const getPurchases = asyncHandler(async (req, res) => {
  const purchase = await Purchase.find().populate("material supplier");

  // populate

  res.status(200).json(purchase);
});

const setPurchase = asyncHandler(async (req, res) => {
  const { material, quantity, price, supplier } = req.body;

  if (!material || !quantity || !price || !supplier) {
    res.status(400);
    throw new Error("Please provide necessary details");
  }

  const purchase = await Purchase.create({
    material: material,
    quantity: quantity,
    price: price,
    supplier: supplier,
  });
  res.status(200).json(purchase);
});

const updatePurchase = asyncHandler(async (req, res) => {
  const purchase = await Purchase.findById(req.params.id);

  if (!purchase) {
    res.status(400);
    throw new Error("Supplier does not exist");
  }

  const updatedPurchase = await Purchase.findByIdAndUpdate(
    req.params.id,
    req.body,
    {
      new: true,
    }
  ).populate("material supplier");

  res.status(200).json(updatedPurchase);
});

const deletePurchase = asyncHandler(async (req, res) => {
  const purchase = await Purchase.findById(req.params.id);

  if (!purchase) {
    res.status(400);
    throw new Error("material not found");
  }

  await purchase.remove();

  res.status(200).json({
    message: "Deleted Purchase " + req.params.id,
  });
});

module.exports = {
  getPurchases,
  setPurchase,
  updatePurchase,
  deletePurchase,
};
