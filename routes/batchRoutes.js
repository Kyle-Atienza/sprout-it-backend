const express = require("express");
const router = express.Router();

const {
  getBatches,
  setBatch,
  updateBatch,
  deleteBatch,
} = require("../contollers/batchController");

router.get("/", getBatches);
router.post("/", setBatch);
router.put("/:id", updateBatch);
router.delete("/:id", deleteBatch);

module.exports = router;
