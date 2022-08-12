const mongoose = require("mongoose");

const materialSchema = mongoose.Schema(
  {
    material: {
      type: String,
      require: [true, "Please add material"],
    },
    weight: {
      type: Number,
      require: [true, "Please add weight"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Material", materialSchema);
