const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
  getFarms,
  setFarm,
  updateFarm,
  deleteFarm,
} = require("../controllers/farmController");

router.get("/", protect, getFarms);
router.post("/", protect, setFarm);
router.put("/:id", protect, updateFarm);
router.delete("/:id", protect, deleteFarm);

module.exports = router;
