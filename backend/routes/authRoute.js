const express = require('express');
const { login, signup,historyDsa,historyDev } = require('../controllers/authController');

const router = express.Router();

router.post('/login', login);
router.post('/signup', signup);
router.post('/historyDsa',historyDsa);
router.post('/historyDev',historyDev);

module.exports = router;