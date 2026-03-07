const express = require('express');
const { saveDsa, findDsa, retestDsa } = require('../controllers/dsaController');
const route = express.Router();

route.post('/saveDsa', saveDsa);
route.post('/findDsa', findDsa);

module.exports = route;
