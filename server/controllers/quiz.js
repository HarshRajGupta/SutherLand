const Test = require('../models/testSchema');
const QuestionCollection = require('../models/QuestionSchema');
const Quiz = require('../models/QuizSchema');

const createQuestionSet = async (number) => {
    try {
        const questionSet = [];
        const questions = await QuestionCollection.find();
        for (let i = 0; i < questions.length; i++) {
            questionSet.push(questions[i]._id);
        }
        while (questionSet.length > number) {
            const index = Math.floor(Math.random() * (questionSet.length - 1));
            questionSet.splice(index, 1);
        }
        console.log('DEBUG: Question Set created');
        // console.log(questionSet);
        return questionSet;
    } catch (err) {
        console.error(err.message);
        return null;
    }
}

const createQuiz = async (req, res) => {
    const { testId, userId } = req.body;
    try {
        const test = await Test.findById(testId);
        const questionSet = await createQuestionSet(test.numQuestions);
        console.log(questionSet);
        const quizObject = new Quiz({
            testId: testId,
            userId: userId,
            questions: questionSet,
            endTime: Date.now() + (test.testDuration * 60 * 1000)
        });
        const quiz = await quizObject.save();
        console.log('DEBUG: Quiz created');
        console.log(quiz);
        return res.status(200).json({
            success: true,
            quiz: quiz,
            msg: 'Quiz created'
        });
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({
            success: false,
            msg: err.message
        });
    }
}

const getQuiz = async (req, res) => {
    const { testId, userId } = req.body;
    try {
        const quizObject = await Quiz.findOne({
            testId: testId,
            userId: userId
        });
        if (quizObject) {
            console.log('DEBUG: Quiz found');
            console.log(quizObject);
            return res.status(200).json({
                success: true,
                quiz: quizObject,
                msg: 'Quiz found'
            });
        }
        else {
            return await createQuiz(req, res);
        }
    }
    catch (err) {
        console.error(err.message);
        return res.status(500).json({
            success: false,
            msg: err.message
        });
    }
}

const calculateScore = async (questions, answers) => {
    try {
        let score = 0;
        for (let i = 0; i < questions.length; i++) {
            const question = await QuestionCollection.findById(questions[i]);
            const answer = answers[i];
            if (question.correctAnswer === answer) {
                ++score;
            }
        }
        return score;
    } catch (err) {
        console.error(err.message);
        return false;
    }
}

const submitQuiz = async (req, res) => {
    const { testId, userId, answers } = req.body;
    try {
        const quizObject = await Quiz.findOne({
            testId: testId,
            userId: userId
        });
        if (quizObject) {
            if (quizObject.endTime + (300000) >= Date.now()) {
                const score = await calculateScore(quizObject.questionSet, answers);
                quizObject.score = score;
                const quiz = await quizObject.save();
                console.log('DEBUG: Quiz submitted');
                return res.status(200).json({
                    success: true,
                    quiz: quiz,
                    msg: 'Quiz submitted'
                });
            } else {
                return res.status(400).json({
                    success: false,
                    msg: 'Quiz over'
                });
            }
        }
        else {
            return res.status(404).json({
                success: false,
                msg: 'Quiz not found'
            });
        }
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({
            success: false,
            msg: err.message
        });
    }
}

module.exports = {
    createQuiz,
    getQuiz,
    submitQuiz
}