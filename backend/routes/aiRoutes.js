const express = require('express');
const router = express.Router();
const { generateQuestion,
    evaluateSubmission,
    generateFrontendQuestion,
    evaluateFrontend,
    generateBackendQuestion,
    evaluateBackend,
    generateFullstackQuestion,
    evaluateFullstack,
    generateDatabaseQuestion,
    evaluateDatabase } = require('../controllers/aiController');

router.post('/generate-question', generateQuestion);
router.post('/evaluate', evaluateSubmission);

router.post('/generate-frontend', generateFrontendQuestion);
router.post('/evaluate-frontend', evaluateFrontend);


router.post('/generate-backend', generateBackendQuestion);
router.post('/evaluate-backend', evaluateBackend);


module.exports = router;