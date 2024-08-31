const express = require("express");
const app = express();
const port = 5050;

const items = [{id:1,name:"item 1"},{id:2,name:"item 2"},{id:3,name:"item 3"}]

const myLogger = function(req,res,next){
    console.log('LOGGED')
    next();
}

app.use(myLogger); // loger middleware

app.get("/", (req, res) => {
    const jsonResponse = {
        message:"hello,you accessed GET route",
        timestamp:Date.now()
    }
  res.send(jsonResponse);
});


// app.get('/route', async (req,res)=>{
//     try{
//         const result = await someAsyncOperation();
//         res.send(result); 
//     }catch(err){
//         res.send({error:err.message});
//     }
// })

app.post("/",(req,res)=>{
    res.send("post request success")
})

app.put("/", (req, res)=>{
    res.send("put request success")
})

//endpoint
app.post('/submit',(req,res)=>{
    const formData = req.body;
    console.log(formData);
    res.send('form submitted successfully');
})

app.put('/update',(req,res)=>{
    res.send("Put request succeeded")
})

app.delete('/remove',(req,res)=>{
    res.send("Delete request succeeded")
})

//template route
app.get('/search/:id',(req,res)=>{
    const id = req.params.id;
    const item = items.find(item=>item.id == id);
    if(item){
        res.send(item);
    }else{
        res.send("Item not found")
    }
    res.send(`Search request for id: ${params.id}`);
})

//middleware to handle 404 Error
app.use((req,res)=>{
    res.send("404 Error");
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
