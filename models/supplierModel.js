const mongoose = require("mongoose");

const supplierSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add name"],
    },
    address: {
      type: String,
      required: [true, "Please add address"],
    },
    contact: {
      type: String,
      required: [true, "Please add contact"],
    },
    isDeleted: {
      type: Boolean,
      default: false,
    },
    products: [
      {
        product: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Material",
        },
        price: Number,
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Supplier", supplierSchema);
