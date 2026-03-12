const express=require('express');
const route=express.route();

route.post('/saveDatabase',(req,res)=>{
    res.send('save database');
})

route.post('/findDatabase',(req,res)=>{
    res.send('find database');
})