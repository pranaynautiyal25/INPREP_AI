const User = require('../models/user');
const bcrypt = require('bcryptjs');


async function login(req, res) {
    const { email, password } = req.body;
    const findUser = await User.findOne({ email });

    if (!findUser) {
        return res.status(400).json({
            message: "user not found"
        })
    }
    else {
        //wanna add jwt here but for later
        const compPassword = await bcrypt.compareSync(password, findUser.password)
        if (!compPassword) {
            return res.status(400).json({
                message: "invalid credentials"
            })
        }

        else {
            return res.status(200).json({
                message: "Login successful"
            })
        }

    }
}

async function signin(req, res) {
    const { email, password } = req.body;

    const findUser = await User.findOne({ email });

    if (findUser) {
        res.status(400).json({
            message: "User already exists"
        })
    }

    else {

        const salt = await bcrypt.genSaltSync(10);
        const hashedPassword = await bcrypt.hashSync(password, salt);

        const newUser = new User({
            email,
            password: hashedPassword
        })

        await newUser.save();
        res.status(200).json({
            message: "signin successful"
        })
    }

}


module.exports = {
    login,
    signin
}