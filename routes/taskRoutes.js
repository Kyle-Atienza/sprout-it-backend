const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
  getTasks,
  setTask,
  updateTask,
  deleteTask,
  deleteAll,
} = require("../controllers/taskController");

router.get("/", protect, getTasks);
router.post("/", protect, setTask);
router.put("/:id", protect, updateTask);
router.delete("/:id", protect, deleteTask);
router.delete("/", protect, deleteAll);

module.exports = router;
