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
      waiting: String, //before 2 weeks
      mixFrequency: Number, // before
      moisture: Number, // after 7
      defects: Number, //after 2
    },
    bagging: {
      startedAt: Date,
      bagWeight: Number, //before 1.5
      total: Number, //after 76
      defects: Number, //after 3
    },
    sterilization: {
      startedAt: Date,
      waiting: String, //before 8 hours
      defects: Number, //after 4
    },
    inoculation: {
      startedAt: Date,
      spawn: String, //before sorgum
      total: Number, //after 73
      defects: Number, //after 1
    },
    fruiting: {
      startedAt: Date,
      waiting: String, //before 1 month
      defects: Number, //after 4
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
