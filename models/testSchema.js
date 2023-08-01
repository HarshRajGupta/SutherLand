const mongoose = require("mongoose");

const testSchema = new mongoose.Schema({
  testDuration: {
    type: Number,
    required: true,
  },
  numQuestions: {
    type: Number,
    required: true,
  },
  candidates: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Candidate",
    },
  ],
  // expiryTime: {
  //   type: Date,
  //   required: true
  // }
});

const Test = mongoose.model("Test", testSchema);

module.exports = Test;
