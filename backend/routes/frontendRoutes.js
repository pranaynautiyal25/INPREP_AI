const express = require('express');
const { saveFrontend, findFrontend } = require('../controllers/frontendController');

const route = express.route();

route.post('/saveFrontend', saveFrontend);
route.post('/findFrontend', findFrontend);