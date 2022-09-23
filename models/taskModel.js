const mongoose = require("mongoose");

const taskSchema = mongoose.Schema(
  {
    batch: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Batch",
    },
    name: {
      type: String,
      required: [true, "Please add name"],
    },
    for: String,
    description: String,
    status: {
      type: String,
      enum: ["ongoing", "cancelled", "finished"],
      default: "ongoing",
    },
    frequency: {
      type: String,
      enum: ["daily", "weekly", "monthly", "once"],
      required: [true, "Please add frequency: [daily, weekly, monthly, once]"],
    },
    runAt: Number,
    start: {
      by: String,
      on: {
        type: mongoose.Mixed,
        required: [true, "Please add start value"],
      },
    },
    time: {
      type: mongoose.Mixed,
      required: [true, "Please add start time"],
    },
    end: {
      by: String,
      on: mongoose.Mixed,
    },
    occurrence: Number,
    next: Date,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Task", taskSchema);
