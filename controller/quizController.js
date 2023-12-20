const { QuizModel } = require("../models/quizModel");


// Controller to create a new quiz
const createQuiz = async (req, res) => {
  try {
    // Extract quiz data from the request body
    const { questions ,  startDate, endDate } = req.body;

    // Get the user ID from the authenticated user 
    const userId = req.body.userId; 

    // Create a new quiz associated with the user
    const quiz = new QuizModel({
      userId,
      questions,
      startDate,
      endDate
    });

    // Save the quiz to the database
    await quiz.save();

    res.status(201).send({ message: 'Quiz created', quiz });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
};

// Controller to get the currently active quiz
const getActiveQuiz = async (req, res) => {
  try {
    // Find the active quiz based on the current date
    const activeQuiz = await QuizModel.find({
      status: 'active',
    });

    if (!activeQuiz) {
      return res.status(404).send({ message: 'No active quiz found' });
    }

    res.status(200).send({message: 'Active quiz' , quiz: activeQuiz });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
};


// Controller to record user responses to quiz questions
const recordUserResponses = async (req, res) => {
    try {

        const userId = req.body.userId
        const {quizId }= req.params
      const {  userAnswers } = req.body;
  
      // Check if the user has already submitted responses
      const quiz = await QuizModel.findById(quizId);
  
      if (!quiz) {
        return res.status(404).send({  message: 'Quiz not found' });
      }
  
      const userResponseIndex = quiz.userResponses.findIndex(response => response.userId.equals(userId));
  
      if (userResponseIndex !== -1) {
        // User has already submitted responses, return an error
        return res.status(400).send({  message: 'User has already submitted responses' });
      }
  
      // User is submitting responses for the first time
      quiz.userResponses.push({ userId, answers: userAnswers });
  
      // Save the updated quiz to the database
      await quiz.save();
  
      res.status(200).send({  message: 'User responses recorded successfully' });
    } catch (error) {
      console.error(error);
      res.status(500).send({  message: 'Internal Server Error' });
    }
  };
  




// Controller to get the result of a quiz by ID
const getQuizResult = async (req, res) => {
    try {
      const userId = req.body.userId
      const { id } = req.params;
  
      // Find the quiz by ID
      const quiz = await QuizModel.findById(id);
  
      if (!quiz) {
        return res.status(404).send({  message: 'Quiz not found' });
      }
  
      // Check if the quiz has ended
      const quizEndTime = new Date(quiz.endDate);
      const currentTime = new Date();
  
      if (currentTime < quizEndTime) {
        return res.status(400).send({  message: 'Quiz has not ended yet' });
      }
  
      // Calculate the quiz result
      const result = calculateQuizResult(quiz,userId);
  
      res.status(200).send({  result });
    } catch (error) {
      console.error(error);
      res.status(500).send({  message: 'Internal Server Error' });
    }
  };
  
  // Function to calculate the quiz result
  const calculateQuizResult = (quiz, userId) => {
    const userResponses = quiz.userResponses || [];
    const totalQuestions = quiz.questions.length;
    let correctAnswers = 0;
    const questionsWithAnswers = [];
    
    let ques = quiz.questions.forEach(element => {
      let question = element.question
      let answer = element.options[element.rightAnswer]

      questionsWithAnswers.push({question,answer})
      return questionsWithAnswers
    });
  
   
    // Find the responses of the logged-in user
    const userResponse = userResponses.find(response => response.userId.equals(userId));
  
    if (userResponse) {
      // Calculate the number of correct answers for the logged-in user
      userResponse.answers.forEach(answer => {
        const question = quiz.questions[answer.questionIndex];
        if (question && answer.userAnswer === question.rightAnswer) {
          correctAnswers++;
        }
      });
    }
  
    // Calculate the percentage score
    const score = (correctAnswers / totalQuestions) * 100;
  
    return {
      score,
      correctAnswers,
      totalQuestions,
      questionsWithAnswers
    };
  };
  

// Controller to get a list of all quizzes
const getAllQuizzes = async (req, res) => {
  try {
    // Find all quizzes
    const quizzes = await QuizModel.find();

    res.status(200).send({ message: "All the quizzes" ,quizzes });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: 'Internal Server Error' });
  }
};





module.exports ={createQuiz,getActiveQuiz,recordUserResponses,getQuizResult,getAllQuizzes}
