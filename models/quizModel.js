const mongoose = require('mongoose');

const quizSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  questions: [
    {
      question: { type: String, required: true },
      options: { type: [String], required: true },
      rightAnswer: { type: Number, required: true },
    },
  ],
  userResponses: [
    {
      userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
      answers: [
        {
          questionIndex: { type: Number, required: true },
          userAnswer: { type: Number, required: true },
        },
      ],
    },
  ],
  startDate: { type: Date, required: true },
  endDate: { type: Date, required: true },
  status: { type: String, enum: ['active', 'inactive', 'finished'], default: 'inactive' },
});

const QuizModel = mongoose.model('Quiz', quizSchema);

module.exports = {QuizModel};
