const express = require('express');
const quizRouter= express.Router();
const { createQuiz, getActiveQuiz,recordUserResponses, getQuizResult, getAllQuizzes} = require('../controller/quizController');
const { auth } = require('../middleware/authMiddleware');


// Create a quiz
quizRouter.post('/', auth ,createQuiz);

// Get active quiz
quizRouter.get('/active', auth , getActiveQuiz);

// give the response/answer

quizRouter.put('/:quizId' , auth , recordUserResponses)

// Get quiz result
quizRouter.get('/:id/result', auth , getQuizResult);

// Get all  quizzes

quizRouter.get('/all', auth , getAllQuizzes);




module.exports = {quizRouter};
