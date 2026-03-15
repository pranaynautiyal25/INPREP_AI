const express = require('express');
const { saveBackend, findBackend } = require('../controllers/backendController');
const route = express.Router();

route.post('/saveBackend', saveBackend);
route.post('/findBackend', findBackend);

module.exports = route;