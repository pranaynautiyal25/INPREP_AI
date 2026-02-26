const mongoose = require('mongoose');

const dsaSchema = new mongoose.Schema({
    question: {
        type: String,
        required: true
    },
    code: {
        type: String,
        required: true
    },
    score: {
        type: Number,
        required: true
    },
    result: {
        type: String,
        required: true
    }
});


module.exports = mongoose.model('Dsa', dsaSchema);