const mongoose = require("mongoose");

const notificationSchema = mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Please add message"],
    },
    message: String,
  },
  { timestamps: true }
);

module.exports = mongoose.model("Notication", notificationSchema);
