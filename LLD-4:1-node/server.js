const http = require('http'); //inbuilt module in nodejs

// console.log(http);

const data = {
    name:"Alex",
    id:"3435",
    address:"123 Main St",
    phone:"123-456-7890",
    email:"alex@example.com",
    hobbies:["reading","painting","coding"]
}

//create a server with the help http module
const server = http.createServer((req,res)=>{
    // res.setHeader('Content-Type','text/html')
    // res.setHeader("Content-Type", "application/json");
    // res.end(JSON.stringify(data));

    //responding with html
    // res.write(`<html>
    //     <head>
    //         <title>Node.js HTTP Server</title>
    //     </head>
    //     <body>`);

    // res.write(`<h1>Welcome to Node.js HTTP Server</h1>
    //         <p>This is a simple HTTP server created using Node.js</p>
    //     </body>
    // </html>`)


    //End the response
    // res.end();
})

//listen on http://localhost:3000
server.listen("3000",()=>{
    console.log("Server is running on port 3000");
})