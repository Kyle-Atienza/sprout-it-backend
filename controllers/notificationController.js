const asyncHandler = require("express-async-handler");

const Notification = require("../models/notificationModel");

const getNotifications = asyncHandler(async (req, res) => {
  const notifications = await Notification.find();

  res.status(200).json(notifications);
});

const setNotification = asyncHandler(async (req, res) => {
  const { title, message } = req.body;

  if (!title) {
    res.status(400);
    throw new Error("Title is required");
  }

  const notification = await Notification.create({
    title: title,
    message: message,
  });

  res.status(200).json(notification);
});

const deleteNotification = asyncHandler(async (req, res) => {
  const notification = await Notification.findById(req.params.id);

  if (!notification) {
    res.status(400);
    throw new Error("Notification not found");
  }

  await notification.remove();

  res.status(200).json({
    id: req.params.id,
  });
});

module.exports = {
  getNotifications,
  setNotification,
  deleteNotification,
};
