const express = require('express');
const { login, signup,historyDsa } = require('../controllers/authController');

const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);
router.post('/historyDsa',historyDsa);

module.exports = router;