const Test = require("../models/testSchema");

const createTest = async (req, res) => {
  console.log("DEBUG: Create Test request received");
  const { testDuration, numQuestions, expiryTime } = req.body;
  try {
    testObject = new Test({
      testDuration,
      numQuestions,
      expiryTime,
    });
    const test = await testObject.save();
    console.log(`DEBUG: Test created ${test._id.toString()}}`);
    return res.status(200).json({
      success: true,
      id: test._id.toString(),
      msg: "Test created",
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({
      success: false,
      msg: err.message,
    });
  }
};

const TestList = async (req, res) => {
  console.log("DEBUG: Test List request received");
  try {
    const testList = await Test.find();
    console.log(`DEBUG: ${testList}`);
    console.log(`DEBUG: Test List sent`);
    return res.status(200).json({
      success: true,
      testList: testList,
      msg: "Test List sent",
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({
      success: false,
      msg: err.message,
    });
  }
};

const TestDetails = async (req, res) => {
  console.log("DEBUG: Test Details request received");
  const { testId } = req.body;
  try {
    const test = await Test.findById(testId);
    console.log(`DEBUG: ${test}`);
    console.log(`DEBUG: Test Details sent`);
    return res.status(200).json({
      success: true,
      test: test,
      msg: "Test Details sent",
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({
      success: false,
      msg: err.message,
    });
  }
};

module.exports = {
  createTest,
  TestList,
  TestDetails,
};
