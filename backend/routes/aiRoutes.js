const express = require('express');
const router = express.Router();
const { generateQuestion, evaluateSubmission, generateFrontendQuestion, evaluateFrontend } = require('../controllers/aiController');

router.post('/generate-question', generateQuestion);
router.post('/evaluate', evaluateSubmission);

router.post('/generate-frontend', generateFrontendQuestion);
router.post('/evaluate-frontend', evaluateFrontend);

module.exports = router;