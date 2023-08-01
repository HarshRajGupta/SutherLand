const express = require("express");
const router = express.Router();

const { registerUser, loginUser, logoutUser } = require("../controllers/auth");

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);

module.exports = router;
