const express = require('express');
const router = express.Router();
const QuestionCollection = require('../models/QuestionSchema');

router.post('/get', async (req, res) => {
    const { questionId } = req.body;
    console.log('DEBUG: Get Question request received');
    try {
        const Question = await QuestionCollection.findById(questionId);
        const data = {
            question: Question.question,
            options: Question.options,
        }
        if (Question) {
            console.log(`DEBUG: Question sent`);
            console.log(data);
            return res.status(200).json({
                success: true,
                Question: data,
                msg: 'Question sent'
            });
        }
        else {
            console.log(`DEBUG: Question not found`);
            return res.status(404).json({
                success: false,
                msg: 'Question not found'
            });
        }
    } catch (err) {
        console.error(err.message);
        return res.status(500).json({
            success: false,
            msg: err.message
        });
    }
});

module.exports = router;