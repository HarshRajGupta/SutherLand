const QuestionCollection = require("../models/QuestionSchema");

const addQuestions = async (req, res) => {
  console.log("DEBUG: Add Question request received");
  const { question, options, correctOption } = req.body;
  try {
    QuestionCollectionObject = new QuestionCollection({
      question,
      options,
      correctOption,
    });
    const Question = await QuestionCollectionObject.save();
    console.log(`DEBUG: Question Saved ${Question._id.toString()}`);
    return res.status(200).json({
      success: true,
      id: Question._id.toString(),
      msg: "Question saved",
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({
      success: false,
      msg: err.message,
    });
  }
};

const getQuestions = async (req, res) => {
  console.log("DEBUG: Get Question request received");
  try {
    const Question = await QuestionCollection.find();
    console.log(`DEBUG: Question sent`);
    return res.status(200).json({
      success: true,
      Question: Question,
      msg: "Question sent",
    });
  } catch (err) {
    console.error(err.message);
    return res.status(500).json({
      success: false,
      msg: err.message,
    });
  }
};

// const getQuestionById =

module.exports = {
  addQuestions,
  getQuestions,
};
