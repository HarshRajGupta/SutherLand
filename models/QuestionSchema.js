const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const QuestionSchema = new Schema({
  question: {
    type: String,
    required: true,
  },
  options: {
    type: Array,
  },
  correctOption: {
    type: Number,
  },
});

module.exports = QuestionCollection = mongoose.model(
  "QuestionCollection",
  QuestionSchema,
);
