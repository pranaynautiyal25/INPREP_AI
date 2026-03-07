const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    dsaHistory: [
        {
            dsaModelId: {
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Dsa',
                required: true
            },
            attemptedAt: {
                type: Date,
                default: Date.now
            }
        }
    ]
}, { timestamps: true });

const User = mongoose.model('User', userSchema);

module.exports = User;
