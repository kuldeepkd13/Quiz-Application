const cron = require('cron');
const {QuizModel }= require('../models/quizModel');

const startQuizStatusUpdate = () => {
  new cron.CronJob('*/5 * * * *', async () => {
    try {
      // Logic to update quiz status based on conditions
      const now = new Date();

      // Find quizzes where status is 'active' and end time has passed
      const quizzesToFinish = await QuizModel.find({
        status: 'active',
        endDate: { $lte: now }
      });

      // Update status to 'finished'
      quizzesToFinish.forEach(async (quiz) => {
        quiz.status = 'finished';
        await quiz.save();
      });

      // Find quizzes where status is 'inactive' and start time has started
      const quizzesToActivate = await QuizModel.find({
        status: 'inactive',
        startDate: { $lte: now }
      });

      // Update status to 'active'
      quizzesToActivate.forEach(async (quiz) => {
        quiz.status = 'active';
        await quiz.save();
      });

      console.log('Quiz statuses updated successfully');
    } catch (error) {
      console.log(error);
    }
  }).start();
};

module.exports = { startQuizStatusUpdate };
