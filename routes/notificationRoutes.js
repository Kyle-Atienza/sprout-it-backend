const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
  getNotifications,
  setNotification,
  deleteNotification,
} = require("../controllers/notificationController");

router.get("/", protect, getNotifications);
router.post("/", protect, setNotification);
router.delete("/:id", protect, deleteNotification);

module.exports = router;
