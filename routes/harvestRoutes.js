const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
  getHarvests,
  setHarvest,
  updateHarvest,
  deleteHarvest,
} = require("../controllers/harvestController");

router.get("/:batchId", protect, getHarvests);
router.post("/:batchId", protect, setHarvest);
router.put("/:harvestId", protect, updateHarvest);
router.delete("/:harvestId", protect, deleteHarvest);

// TODO: update same as above

module.exports = router;
