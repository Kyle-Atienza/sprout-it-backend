const mongoose = require("mongoose");

//TODO: name of batch
const batchSchema = mongoose.Schema(
  {
    farm: String,
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    active: Boolean,
    materials: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Material",
      },
    ],
    composting: {
      moisture: Number,
      period: Date, //finish date of composting
      mixFrequency: Number,
    },
    bagging: {
      bagWeight: Number,
      total: Number,
      defects: Number,
    },
    sterilization: {
      duration: Date,
      defects: Number,
    },
    inoculation: {
      spawn: String,
      total: Number,
      defects: Number,
    },
    fruiting: {
      waiting: Date,
      defects: Number,
    },
    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
      },
    ],
    harvests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Harvest",
      },
    ],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Batch", batchSchema);
