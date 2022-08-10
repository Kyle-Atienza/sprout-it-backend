const express = require("express");
const router = express.Router();

const {
  getMaterials,
  setMaterial,
  updateMaterial,
  deleteMaterial,
} = require("../controllers/materialController");

router.get("/", getMaterials);
router.post("/", setMaterial);
router.put("/:id", updateMaterial);
router.delete("/:id", deleteMaterial);

module.exports = router;
