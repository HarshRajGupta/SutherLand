const express = require("express");
const router = express.Router();

const { getQuiz, submitQuiz } = require("../controllers/quiz");

router.route("/get").post(getQuiz);
router.route("/submit").post(submitQuiz);

module.exports = router;
