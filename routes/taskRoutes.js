const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
  getTasks,
  setTask,
  updateTask,
  deleteTask,
} = require("../controllers/taskController");

router.get("/", getTasks);
router.post("/", protect, setTask);
router.put("/:id", updateTask);
router.delete("/:id", deleteTask);

module.exports = router;
