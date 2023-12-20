# Quiz Application Backend

This Quiz Application is a web-based platform that allows users to create and participate in timed quizzes. It provides a RESTful API built with Node.js, Express.js, and MongoDB for backend development. 

## Table of Contents

-[Features](#features)
-[Technologies](#technologies-used)
- [Installation](#installation)
- [Routes](#routes)
  - [User Authentication](#user-authentication)
  - [Quiz Management](#quiz-management)


## Features

- Users can create quizzes with questions, answer options, and correct answers.
- Quizzes are timed, with specified start and end dates.
- Participants can submit their answers within the given time frame.
- Results are available after the quiz ends, including individual scores and correctness of answers.

## Technologies Used

- Node.js
- Express.js
- MongoDB
- JWT-based authentication
- Rate limiting for security
- Cron jobs for automating status updates


## Installation

1. Clone the repository:

   ```bash
   git clone https://github.com/your-username/quiz-backend.git
   cd Quiz-Application
   ```

2. Install dependencies:

   ```bash
   npm install
   ```

3. Set up your MongoDB connection by creating a `.env` file in the root directory with the following content:

   ```env
   MONGOURL=your-mongodb-connection-string
 
   ```

   Replace `your-mongodb-connection-string` with your MongoDB connection string .

4. Run the application:

   ```bash
   npm run server
   ```

   The server will be running on http://localhost:8080 by default.

## Routes

### User Authentication

| Method | Endpoint         | Description              | Authentication Required |
| ------ | -----------------| ------------------------ | ------------------------ |
| POST   | `/user/register` | Create a new user        | No                       |
| POST   | `/user/login`    | Log in an existing user  | No                       |

### Quiz Management

| Method | Endpoint        | Description                         | Authentication Required |
| ------ | --------------- | ----------------------------------- | ------------------------ |
| POST   | `/quizzes`      | Create a new quiz                   | Yes                      |
| GET    | `/quizzes/active`| Get the currently active quiz      | Yes                      |
| GET    | `/quizzes/:id/result`| Get quiz results               | Yes                      |
| GET    | `/quizzes/all`  | Get all quizzes                     | Yes                      |
| PUT    | `/quizzes/:id`  | give the Answer of the quiz question| Yes                      |


