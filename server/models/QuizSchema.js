const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    testId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'test',
        required: true
    },
    questions: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Question',
    }],
    endTime: [{
        type: Date
    }],
    score: {
        type: Number,
        default: 0
    }
});

const Quiz = mongoose.model('Quiz', quizSchema);

module.exports = Quiz;
