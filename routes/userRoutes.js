const express = require("express");
const { UserModel } = require("../models/userModel");
const { createUser, userLogin } = require("../controller/userController");



const userRoute = express.Router();

// User register route
userRoute.post("/register", createUser);

// User login route
userRoute.post("/login", userLogin);


module.exports = {userRoute}