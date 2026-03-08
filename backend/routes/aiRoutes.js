const express = require('express');
const router = express.Router();
const { generateQuestion, evaluateSubmission } = require('../controllers/aiController');

router.post('/generate-question', generateQuestion);
router.post('/evaluate', evaluateSubmission);

module.exports = router;