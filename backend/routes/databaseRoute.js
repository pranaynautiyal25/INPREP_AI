const express=require('express');
const {saveDatabase,findDatabase}=require('../controllers/databaseController')

const route=express.route();

route.post('/saveDatabase',saveDatabase);
route.post('/findDatabase',findDatabase);