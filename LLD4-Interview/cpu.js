const express = require('express');
const cors = require('cors');
const app = express();


app.use(cors());

function calcaluteFib(number){
    if(number<=1){
        return number;
    }
    return calcaluteFib(number-1) + calcaluteFib(number - 2);
}

app.get('/fib',(req,res)=>{
    const {number,requestNumber} = req.query;
    if(!number ||!requestNumber || number<0){
        return res.status(400).send('Please provide number and requestNumber');
    }
    const answer = calcaluteFib(number);
    res.send({
        status:'success',
        message:answer,
        requestNumber:requestNumber
    })
})

app.listen('3000',()=>{
    console.log('Server is running on port 3000');
})