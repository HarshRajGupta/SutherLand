const Quiz = require("../models/QuizSchema");
const User = require("../models/User");
const mongoose = require("mongoose");

const getTest = async (req, res) => {
  const { testId } = req.body;
  try {
    if (!testId || !mongoose.Types.ObjectId.isValid(testId)) {
      return res.status(200).json({
        success: false,
        msg: "Invalid testId",
      });
    }
    const userList = await Quiz.find({ testId: testId });
    if (userList.length) {
      console.log("DEBUG: Quiz found");
      console.log(userList);
      return res.status(200).json({
        success: true,
        quiz: userList,
        msg: "Quiz details found",
      });
    }
  } catch (err) {
    console.error(err.message);
    return res.status(200).json({
      success: false,
      msg: err.message,
    });
  }
};

const getUser = async (req, res) => {
  const { userId } = req.body;
  try {
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(200).json({
        success: false,
        msg: "Invalid userId",
      });
    }
    const user = await User.findById(userId, {
      password: 0,
      _id: 0,
      __v: 0,
      isAdmin: 0,
    });
    if (user) {
      console.log("DEBUG: User found");
      console.log(user);
      return res.status(200).json({
        success: true,
        user: user,
        msg: "User details found",
      });
    } else {
      return res.status(200).json({
        success: false,
        msg: "User not found",
      });
    }
  } catch (err) {
    console.error(err.message);
    return res.status(200).json({
      success: false,
      msg: err.message,
    });
  }
};

module.exports = {
  getTest,
  getUser,
};
