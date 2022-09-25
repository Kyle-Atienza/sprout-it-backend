const express = require("express");
const router = express.Router();

const { protect } = require("../middleware/authMiddleware");

const {
  getPurchases,
  setPurchase,
  updatePurchase,
  deletePurchase,
} = require("../controllers/purchaseController");

router.get("/", protect, getPurchases);
router.post("/", protect, setPurchase);
router.put("/:id", protect, updatePurchase);
router.delete("/:id", protect, deletePurchase);

module.exports = router;
