const express = require("express");
const router = express.Router();

const authRouter = require("./auth");
const adminRouter = require("./admin");
const quizRouter = require("./quiz");
const questionsRouter = require("./questions");

router.use("/auth", authRouter);
router.use("/admin", adminRouter);
router.use("/quiz", quizRouter);
router.use("/question", questionsRouter);

module.exports = router;