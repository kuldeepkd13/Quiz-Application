
const { UserModel } = require("../models/userModel");
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")

// Controller to create a new User
const createUser = async(req,res)=>{
    const { userName, email, password} = req.body;

    try {
        const user = await UserModel.findOne({ email });

        // Check if user already exists

        if (user) {
            return res.status(400).send({ "message": "User Already Present With this Email" });
        }

        // Hashing the password before saving to the database
        bcrypt.hash(password, 5, async (err, hash) => {
            if (err) {
                return res.status(500).send({ "message": "Error hashing password" });
            }

            // Creating a new user instance

            const newUser = new UserModel({
                userName,
                email,
                password: hash
            });

            // Saving the new user to the database

            await newUser.save();
            res.status(200).send({ message: "Registration successful" });
        });
    } catch (error) {
        res.status(500).send({ "message": error.message });
    }
}



// User login controller

const userLogin = async(req,res)=>{
        // Extracting login credentials from request body
        const { email, password } = req.body;

        try {
            const user = await UserModel.findOne({ email });
    
            if (user) {
                // Comparing the hashed password
                bcrypt.compare(password, user.password, async (err, result) => {
                    if (result) {
                        // Creating a JWT token upon successful login
                        res.status(200).send({ "message": "Login Successful", user, token: jwt.sign({ userId: user._id }, 'name') });
                    } if (err || !result) {
                        res.status(400).send({ "message": "Incorrect email or password, please try again." });
                    }
                });
            } else {
                res.status(400).send({ "message": "Incorrect email or password, please try again." });
            }
        } catch (error) {
            res.status(400).send({ "message": error.message });
        }
}




module.exports = {createUser,userLogin}