const mongoose = require("mongoose");

const materialSchema = mongoose.Schema(
  {
    material: {
      type: String,
      default: [true, "Please add material"],
    },
    weight: {
      type: Number,
      default: [true, "Please add weight"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Material", materialSchema);
