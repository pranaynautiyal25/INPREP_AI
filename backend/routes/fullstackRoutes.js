const express = require('express');
const { saveFullstack, findFullstack } = require('../controllers/fullstackController');
const route = express.Router();

route.post('/saveFullstack', saveFullstack);
route.post('/findFullstack', findFullstack);

module.exports = route;