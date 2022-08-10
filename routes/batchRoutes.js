const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
  getBatches,
  setBatch,
  updateBatch,
  deleteBatch,
} = require("../controllers/batchController");

router.get("/", protect, getBatches);
router.post("/", protect, setBatch);
router.put("/:id", protect, updateBatch);
router.delete("/:id", protect, deleteBatch);

module.exports = router;
