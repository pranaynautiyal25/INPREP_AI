const mongoose = require('mongoose');

const devSchema = new mongoose.Schema(
    {
        category: {
            type: String,
            required: true
        },
        question: {
            type: [String],
            required: true
        },
        yourAnswer: {
            type: [String],
            required: true
        },
        correctAnswer: {
            type: [String],
            required: true
        },
        answerScore: {
            type: [Number],
            required: true
        },
        explainationScore: {
            type: String,
            required: true
        },
        improvementScope: {
            type: String,
            required: true
        }
    }
    , { timestamps: true })


module.exports = mongoose.model('Dev', devSchema);