const mongoose = require('mongoose');

const dsaSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    constraint: {
        type: String,
        required: true
    },
    yourApproach: {
        type: String,
        required: true
    },
    betterApproach: {
        type: String,
        required: true
    },
    codeScore: {
        type: Number,
        required: true
    },
    explainationScore: {
        type: String,
        required: true
    },
    codeReview: {
        type: String,
        required: true
    },
    explainationReview: {
        type: String,
        required: true
    },
    improvementScope: {
        type: String,
        required: true
    }
},{timestamps:true});


module.exports = mongoose.model('Dsa', dsaSchema);