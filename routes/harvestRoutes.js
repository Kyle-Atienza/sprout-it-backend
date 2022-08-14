const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
  getHarvests,
  setHarvest,
  updateHarvest,
  deleteHarvest,
} = require("../controllers/harvestController");

router.get("/", protect, getHarvests);
router.post("/", protect, setHarvest);
router.put("/:id", protect, updateHarvest);
router.delete("/:id", protect, deleteHarvest);

module.exports = router;
