const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
  getBatches,
  getBatch,
  setBatch,
  updateBatch,
  deleteBatch,
  deleteBatchesOnPhase,
} = require("../controllers/batchController");

router.get("/", protect, getBatches);
router.get("/:id", protect, getBatch);
router.post("/", protect, setBatch);
router.put("/:id", protect, updateBatch);
router.delete("/:id", protect, deleteBatch);
router.delete("/phase/:phase", protect, deleteBatchesOnPhase);

module.exports = router;
