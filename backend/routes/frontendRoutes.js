const express=require('express');
const route=express.route();

route.post('/saveFrontend',(req,res)=>{
    res.send('save frontend');
})

route.post('/findFrontend',(req,res)=>{
    res.send('find frontend');
})