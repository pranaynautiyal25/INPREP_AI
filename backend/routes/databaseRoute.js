const express = require('express');
const { saveDatabase, findDatabase } = require('../controllers/databaseController');
const route = express.Router();

route.post('/saveDatabase', saveDatabase);
route.post('/findDatabase', findDatabase);

module.exports = route;