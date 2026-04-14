const express = require('express');
const authRouter = require('./routes/authRoute');
const dsaRouter = require('./routes/dsaRoutes');
const connectDB = require('./config/db');
const aiRouter = require('./routes/aiRoutes');
const frontendRouter = require('./routes/frontendRoutes')
const backendRouter = require('./routes/backendRoutes');
const databaseRouter = require('./routes/databaseRoute');
const fullstackRouter = require('./routes/fullstackRoutes');
require('dotenv').config();

const app = express();
const cors = require("cors");

app.use(cors({
    origin: "https://inprep-ai-frontend.onrender.com",
    credentials: true
}));

connectDB();

app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/dsa', dsaRouter);
app.use('/api/ai', aiRouter);
app.use('/api/frontend', frontendRouter);
app.use('/api/backend', backendRouter);
app.use('/api/database', databaseRouter);
app.use('/api/fullstack', fullstackRouter);

app.get('/', (req, res) => {
    res.send('hello world');
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, "0.0.0.0", () => {
    console.log(`server running on port ${PORT}`);
});