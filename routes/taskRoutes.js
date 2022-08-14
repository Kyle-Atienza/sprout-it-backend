const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
  getTasks,
  setTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

router.get("/", protect, getTasks);
router.post("/", protect, setTask);
router.put("/:id", protect, updateTask);
router.delete("/:id", protect, deleteTask);

module.exports = router;
