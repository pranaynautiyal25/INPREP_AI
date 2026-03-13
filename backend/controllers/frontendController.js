const Dev = require('../models/dev');
const User = require('../models/user');

const saveFrontend = async (req, res) => {

    try {
        const { email,
            category,
            question,
            yourAnswer,
            correctAnswer,
            answerScore,
            explainationScore,
            improvementScore
        } = req.body;
        const newDev = new Dev({
            category,
            question,
            yourAnswer,
            correctAnswer,
            answerScore,
            explainationScore,
            improvementScore
        })

        await newDev.save();

        const user = await User.findOne({ email });

        user.devHistory.push({ devModelId: newDev._id });
        user.save();

        res.status(200).json({
            message: "Exam Saved Successfully"
        })

    }
    catch (error) {
        res.status(500).json({
            message: "Failed to Save Exam",
        })
    }



}

const findFrontend = async (req, res) => {

    try {
        const { _id } = req.body;

        const dev = await User.findOne({ _id });


        res.status(200).jon({
            message: "found successfully",
            payload: dev
        })


    }
    catch (error) {
        res.status(500).json({
            message: "failde to fetch exam"
        })
    }
}

module.exports={saveFrontend,findFrontend};