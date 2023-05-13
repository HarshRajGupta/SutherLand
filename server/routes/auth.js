const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware.js");

const {
  registerUser,
  loginUser,
  logoutUser,
  changePassword,
  changeProfile,
} = require("../controllers/auth");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router.route("/change-password").put(authMiddleware, changePassword);
router.route("/change-profile").put(authMiddleware, changeProfile);

module.exports = router;
