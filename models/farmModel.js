const mongoose = require("mongoose");

const farmSchema = mongoose.Schema({
  name: String,
  creator: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  owners: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  workers: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
  ],
  batches: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Batch",
    },
  ],
});

module.exports = mongoose.model("Farm", farmSchema);
