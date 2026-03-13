const express=require('express');
const { saveFullstack, findFullstack } = require('../controllers/fullstackController');

const route=express.route();

route.post('/saveFullstack',saveFullstack);
route.post('/findFullstack',findFullstack);