const mongoose = require("mongoose");

//TODO: name of batch
const batchSchema = mongoose.Schema(
  {
    farm: String,
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
    },
    name: String,
    active: Boolean,
    activePhase: {
      type: String,
      default: "composting",
    },
    materials: [
      {
        material: {
          type: mongoose.Schema.Types.ObjectId,
          ref: "Material",
        },
        weight: Number,
      },
    ],
    composting: {
      startedAt: Date,
      moisture: Number,
      period: Date, //finish date of composting
      mixFrequency: Number,
    },
    bagging: {
      startedAt: Date,
      bagWeight: Number,
      total: Number,
      defects: Number,
    },
    sterilization: {
      startedAt: Date,
      duration: Date,
      defects: Number,
    },

    inoculation: {
      startedAt: Date,
      spawn: String,
      total: Number,
      defects: Number,
    },
    fruiting: {
      startedAt: Date,
      waiting: Date,
      defects: Number,
    },
    harvests: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Harvest",
      },
    ],
    finishedAt: String,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Batch", batchSchema);
