const express = require('express');
const { saveFrontend, findFrontend } = require('../controllers/frontendController');
const route = express.Router();

route.post('/saveFrontend', saveFrontend);
route.post('/findFrontend', findFrontend);

module.exports=route;