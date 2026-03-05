const express=require('express');

const route=express.Router();

route.post('/historyDsa',()=>{
    res.send('dsa history');
})

route.post('/dsa/:id',()=>{
    res.send('particular');
})

route.post('/createDsa',()=>{
    res.send('dsa exam created');
})


route.post('evaluateDsa',()=>{
    res.send('evaluate');
})

route.post('/saveDsa',()=>{
    res.send('saved');
})



route.post()