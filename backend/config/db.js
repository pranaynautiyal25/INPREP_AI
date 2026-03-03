const mongoose = require('mongoose');
require('dotenv').config();

const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("connected to database successfully");
    }
    catch (e) {
        console.log("failed to connect database ", e);
        process.exit(1);
    }
}

module.exports = connectDB;

