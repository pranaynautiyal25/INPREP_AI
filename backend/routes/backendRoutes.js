const express=require('express');
const route=express.Router();


route.post('/saveBackend',(req,res)=>{
    res.send('save backend');
})

route.post('/findBackend',(res,req)=>{
    res.send('save backend');
})