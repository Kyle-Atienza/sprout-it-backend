const mongoose = require("mongoose");

const harvestsSchema = mongoose.Schema({
  date: {
    type: Date,
    require: [true, "Please add Date"],
  },
  weight: {
    type: Number,
    require: [true, "Please add Weight"],
  },
});

module.exports = mongoose.model("Harvest", harvestsSchema);
