const express = require("express");
const router = express.Router();

const {
  getHarvests,
  setHarvest,
  updateHarvest,
  deleteHarvest,
} = require("../contollers/harvestController");

router.get("/", getHarvests);
router.post("/", setHarvest);
router.put("/:id", updateHarvest);
router.delete("/:id", deleteHarvest);

module.exports = router;
