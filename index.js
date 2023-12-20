const express = require("express");
const { connection } = require("./config/db");
const { userRoute } = require("./routes/userRoutes");
const { quizRouter } = require("./routes/quizRoutes");
const rateLimit = require('express-rate-limit');
const { startQuizStatusUpdate } = require("./utils/quizScheduler");


require('dotenv').config();

const Port = process.env.port || 8080

const app = express();
app.use(express.json())
app.use(rateLimit({ windowMs: 15 * 60 * 1000, max: 100 }))



app.use("/",(req,res)=>{
    res.status(200).send({message:"QuizApplication Backend"})
})

app.use("/user" , userRoute)
app.use("/quizzes" , quizRouter)
startQuizStatusUpdate()

app.listen(Port,async()=>{
    try {
        await connection
        console.log("Connect to Mongodb")
    } catch (error) {
        console.log("Db is not Connected")
    }
    console.log(`server is running at ${Port}`)

})