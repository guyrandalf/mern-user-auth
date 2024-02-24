const mongoose = require("mongoose")
const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, 'Firstname is required'],
    },
    lastName: {
        type: String,
        required: [true, 'Lastname is required'],
    },
    email: {
        type: String,
        required: [true, 'Email is required'],
        unique: [true, 'Email already taken'],
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
})

const User = mongoose.model("User", userSchema)

module.exports = User
