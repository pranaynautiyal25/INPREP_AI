const express = require('express');
const authRouter = require('./routes/authRoute');
const dsaRouter = require('./routes/dsaRoutes');
const connectDB = require('./config/db');
const aiRouter=require('./routes/aiRoutes');
const app = express();
const cors = require('cors');

app.use(cors());

connectDB();

app.use(express.json());
app.use('/api/auth', authRouter);
app.use('/api/dsa', dsaRouter);
app.use('/api/ai', aiRouter);

app.get('/', (req, res) => {
    res.send('hello world');
});

app.listen(5000, () => {
    console.log(`server running on localhost:${5000}`);
});