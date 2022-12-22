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
    harvestedAt: {
      type: Date,
      required: [true, "Please add Date"],
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Harvest", harvestsSchema);
