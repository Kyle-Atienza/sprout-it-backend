const express = require("express");
const router = express.Router();

const {
  getUsers,
  registerUser,
  loginUser,
  getUser,
  updateUser,
  deleteUser,
  inviteUser,
  registerInvitedUser,
  forgotPassword,
  resetPassword,
} = require("../controllers/userController");

router.get("/", getUsers);
router.post("/register", registerUser);
router.post("/register/:invite", registerInvitedUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);
router.post("/login", loginUser);
router.post("/invite", inviteUser);
router.get("/profile", getUser);
router.post("/forgot-password", forgotPassword);
router.post("/reset-password", resetPassword);

module.exports = router;
