const mongoose = require("mongoose");

const harvestsSchema = mongoose.Schema({
  date: {
    type: Date,
    required: [true, "Please add Date"],
  },
  weight: {
    type: Number,
    required: [true, "Please add Weight"],
  },
  batch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Batch",
  },
});

module.exports = mongoose.model("Harvest", harvestsSchema);
