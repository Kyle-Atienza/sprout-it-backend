const mongoose = require("mongoose");

const harvestsSchema = mongoose.Schema(
  {
    batch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Batch",
    },
    weight: {
      type: Number,
      required: [true, "Please add Weight"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Harvest", harvestsSchema);
