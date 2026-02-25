const express = require('express');

const router = express.Router();

router.post('/login', (req, res) => {
    res.send('login page')
})

router.post('/siginn', (req, res) => {
    res.send('signin page')
})

module.exports = router;