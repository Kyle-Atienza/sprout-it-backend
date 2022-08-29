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
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Material", materialSchema);
