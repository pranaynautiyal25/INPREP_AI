const express=require('express');
const route=express.route();

route.post('/saveFullstack',(req,res)=>{
    res.send('save full');
})

route.post('/findFullstack',(req,res)=>{
    res.send('find fullstack');
})