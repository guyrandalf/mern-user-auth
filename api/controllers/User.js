const User = require("../models/User")
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken")
require("dotenv").config()

const registerUser = async (req, res) => {
    try {
        const data = new User({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: req.body.password
        })
        await data.save()
        res.status(201).json({ data })
    } catch (error) {
        if (error.name === 'ValidationError') {
            // Simplify the error response
            const validationErrors = Object.values(error.errors).map(err => err.message);
            res.status(400).json({ success: false, message: 'Validation Failed', errors: validationErrors });
        } else {
            // Handle other errors
            console.error('Error during registration:', error);
            res.status(500).json({ success: false, message: 'Internal Server Error' });
        }
    }
}

const loginUser = async (req, res) => {
    try {
        const data = await User.findOne({
            email: req.body.email
        })

        if (!data) return res.status(401).json({ message: "Invalid email or password" })

        const isPasswordValid = await bcrypt.compare(req.body.password, data.password)

        if (!isPasswordValid) return res.status(401).json({ message: "Invalid email or password" })

        const token = jwt.sign({ userId: data.id }, process.env.JWT_SECRET, {
            expiresIn: "1h"
        })

        res.send(200).json({ token })
    } catch (error) {
        res.status(500).json(error)
    }
}

module.exports = {
    registerUser,
    loginUser
};
