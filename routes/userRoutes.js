const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getUser,
  inviteUser,
  registerInvitedUser,
} = require("../controllers/userController");

router.post("/register", registerUser);
router.post("/register/:invite", registerInvitedUser);
router.post("/login", loginUser);
router.post("/invite", inviteUser);
router.get("/profile", getUser);

module.exports = router;
