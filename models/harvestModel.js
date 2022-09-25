const mongoose = require("mongoose");

const harvestsSchema = mongoose.Schema({
  batch: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Batch",
  },
  datetime: {
    type: Date,
    required: [true, "Please add Datetime"],
  },
  weight: {
    type: Number,
    required: [true, "Please add Weight"],
  },
});

module.exports = mongoose.model("Harvest", harvestsSchema);
