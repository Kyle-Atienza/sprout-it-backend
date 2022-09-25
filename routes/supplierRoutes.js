const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
  getSuppliers,
  setSupplier,
  updateSupplier,
  deleteSupplier,
} = require("../controllers/supplierController");

router.get("/", protect, getSuppliers);
router.post("/", protect, setSupplier);
router.put("/:id", protect, updateSupplier);
router.delete("/:id", protect, deleteSupplier);

module.exports = router;
