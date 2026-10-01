const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({

    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,   // document save karne ke liye required
        unique: true      // duplicate email avoid
    },

    password: {
        type: String,
        required: true
    },

    college: {
        type: String,
        required: true
    },

    branch: {
        type: String
    },

    role: {
        type: String,
        enum: ["student", "faculty"],
        default: "student"
    },

    contributionScore: {
        type: Number,
        default: 0
    }

}, { timestamps: true });

module.exports = mongoose.model("User", userSchema);