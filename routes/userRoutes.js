const express = require("express");
const router = express.Router();

const {
  registerUser,
  loginUser,
  getUser,
  inviteUser,
  registerInvitedUser,
  forgotPassword,
  resetPassword,
} = require("../controllers/userController");

router.post("/register", registerUser);
router.post("/register/:invite", registerInvitedUser);
router.post("/login", loginUser);
router.post("/invite", inviteUser);
router.get("/profile", getUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

module.exports = router;
