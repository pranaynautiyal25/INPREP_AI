const Dsa = require('../models/dsa.js');
const User = require('../models/user.js');

const createDsa = async (req, res) => {
    //api calling
}

const saveDsa = async (req, res) => {
    try {
        const { email, question, constraint,
            yourApproach,
            betterApproach,
            codeScore,
            explainationScore,
            codeReview,
            explainationReview,
            improvementScope } = req.body;

        if (!email) {
            return res.status(400).json({
                message: "email is required"
            });
        }

        const normalizedEmail = String(email).trim().toLowerCase();
        const user = await User.findOne({ email: normalizedEmail });
        if (!user) {
            return res.status(404).json({
                message: "user not found"
            });
        }

        const newDsa = new Dsa({
            question,
            constraint,
            yourApproach,
            betterApproach,
            codeScore,
            explainationScore,
            codeReview,
            explainationReview,
            improvementScope
        });

        await newDsa.save();

        user.dsaHistory.push({ dsaModelId: newDsa._id });
        await user.save();

        return res.status(200).json({
            message: "exam saved successfully",
            dsaModelId: newDsa._id
        });
    } catch (error) {
        return res.status(500).json({
            message: "failed to save exam",
            error: error.message
        });
    }
};

const findDsa = async (req, res) => {
    try {
        const { _id } = req.body;
        const findExam = await Dsa.findOne({ _id });

        if (!findExam) {
            return res.status(404).json({
                message: "exam not found"
            });
        }

        return res.status(200).json({
            message: "found",
            payload: findExam
        });
    } catch (error) {
        return res.status(500).json({
            message: "failed to find exam",
            error: error.message
        });
    }
};

const retestDsa = async (req, res) => {

}


module.exports = {
    saveDsa,
    findDsa,
    retestDsa
}