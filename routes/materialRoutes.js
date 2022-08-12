const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
  getMaterials,
  setMaterial,
  updateMaterial,
  deleteMaterial,
} = require("../controllers/materialController");

router.get("/", protect, getMaterials);
router.post("/", protect, setMaterial);
router.put("/:id", protect, updateMaterial);
router.delete("/:id", protect, deleteMaterial);

module.exports = router;
