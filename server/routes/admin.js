const express = require("express");
const router = express.Router();

const {
    addQuestions,
    getQuestions
} = require("../controllers/questions");

router.route("/question/new").post(addQuestions);
router.route("/question").post(getQuestions);

const {
    createTest,
    TestList,
    TestDetails
} = require("../controllers/test");

router.route("/test/new").post(createTest);
router.route("/test/details").post(TestDetails);
router.route("/test/").post(TestList);

module.exports = router;