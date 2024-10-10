const http = require('http');

const server = http.createServer();



server.on('request',(req,res)=>{
    // console.log(req.headers);
    // console.log("url",req.url);
    // console.log("method",req.method);
    console.log(req);
    if(req.method === "GET"){
        res.writeHead(200,{'Content-Type': 'text/plain'});
        res.end("hello world");
    }else if(req.method === "POST"){
        
    }
})


server.listen(3000,()=>{
    console.log("Server is running on port 3000");
})