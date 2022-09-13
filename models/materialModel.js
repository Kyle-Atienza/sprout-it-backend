const mongoose = require("mongoose");

const materialSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, "Please add material"],
    },
    altName: String,
    unit: {
      type: String,
      required: [true, "Please add unit"],
    },
    quantity: {
      type: Number,
      required: [true, "Please add quantity"],
    }
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Material", materialSchema);
