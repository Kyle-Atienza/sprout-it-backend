const mongoose = require("mongoose");

const purchaseSchema = mongoose.Schema(
  {
    material: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Material",
      required: [true, "Please add material"],
    },
    quantity: {
      type: Number,
      required: [true, "Please add quantity"],
    },
    price: {
      type: Number,
      required: [true, "Please add amount"],
    },
    supplier: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Supplier",
      required: [true, "Please add supplier"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Purchase", purchaseSchema);
