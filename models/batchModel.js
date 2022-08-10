const mongoose = require("mongoose");

//TODO: name of batch
const batchSchema = mongoose.Schema(
  {
    owner: mongoose.Schema.Types.ObjectId,
    active: Boolean,
    materials: [mongoose.Schema.Types.ObjectId],
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
      tasks: [
        {
          name: {
            type: String,
            required: [true, "Please add name"],
          },
          frequency: {
            type: Number,
            require: [true, "Please add frequency"],
          },
        },
      ],
    },
    harvests: [mongoose.Schema.Types.ObjectId],
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Batch", batchSchema);
