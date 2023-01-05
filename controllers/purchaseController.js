const asyncHandler = require("express-async-handler");

const Purchase = require("../models/purchaseModel");
const Material = require("../models/materialModel");

const getPurchases = asyncHandler(async (req, res) => {
  const purchase = await Purchase.find().populate("material supplier");

  // populate

  res.status(200).json(purchase);
});

const setPurchase = asyncHandler(async (req, res) => {
  const { materialId, quantity, price, supplierId } = req.body;

  if (!materialId || !quantity || !price || !supplierId) {
    res.status(400);
    throw new Error("Please provide necessary details");
  }

  const material = await Material.findById(materialId);
  // add total quantity to existing total value

  if (!material) {
    res.status(400);
    throw new Error("Material does not exist");
  }

  /* await Material.findByIdAndUpdate(
    materialId,
    {
      quantity: material.quantity + parseFloat(quantity),
      price: price,
    },
    { new: true }
  ); */

  const purchase = await Purchase.create({
    material: materialId,
    quantity: quantity,
    price: price,
    supplier: supplierId,
  });
  res.status(200).json(purchase);

  if (quantity) {
    const purchases = await Purchase.find({
      material: {
        _id: material._id,
      },
    });

    const materialQuantity = purchases.reduce((prev, current) => {
      console.log(current);
      return prev + current.quantity;
    }, 0);

    console.log(purchases, materialQuantity);

    await Material.findByIdAndUpdate(
      materialId,
      {
        quantity: materialQuantity,
        price: price,
      },
      { new: true }
    );
  }
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

  if (req.body.quantity) {
    const purchases = await Purchase.find({
      material: {
        _id: purchase.material._id,
      },
    });

    const materialQuantity = purchases.reduce((prev, current) => {
      console.log(current);
      return prev + current.quantity;
    }, 0);

    await Material.findByIdAndUpdate(
      purchase.material._id,
      {
        quantity: materialQuantity,
      },
      { new: true }
    );
  }

  res.status(200).json(updatedPurchase);
});

const deletePurchase = asyncHandler(async (req, res) => {
  if (req.params.id === "all") {
    const purchases = await Purchase.find();

    purchases.forEach(async (purchase) => {
      await purchase.remove();
    });

    res.status(200).json({
      message: "All Purchases Removed",
    });
  } else {
    const purchase = await Purchase.findById(req.params.id);

    if (!purchase) {
      res.status(400);
      throw new Error("material not found");
    }

    await purchase.remove();

    const purchases = await Purchase.find({
      material: {
        _id: purchase.material._id,
      },
    });

    const materialQuantity = purchases.reduce((prev, current) => {
      console.log(current);
      return prev + current.quantity;
    }, 0);

    await Material.findByIdAndUpdate(
      purchase.material._id,
      {
        quantity: materialQuantity,
      },
      { new: true }
    );

    res.status(200).json({
      message: "Deleted Purchase " + req.params.id,
    });
  }
});

const deletePurchasByMaterial = asyncHandler(async (req, res) => {
  const purchases = await Purchase.find({
    material: {
      _id: req.params.id,
    },
  });
  console.log(req.params.id);

  purchases.forEach(async (purchase) => {
    await purchase.remove();
  });

  res.status(200).json({
    material: req.params.id,
  });
});

const deleteAll = asyncHandler(async (req, res) => {
  const purchases = await Purchase.find();

  /* purchases.forEach(async (purchase) => {
    await purchase.remove();
  }); */

  res.status(200).json(purchases);
});

module.exports = {
  getPurchases,
  setPurchase,
  updatePurchase,
  deletePurchase,
  deletePurchasByMaterial,
  deleteAll,
};
