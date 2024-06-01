const fs = require('fs');

// console.log("before")

// fs.readFile('f1.txt',function cb(error,data){
//     console.log(data+"");
// })
// console.log("after")

//promisified fxn -> fxn which returns promise
let f1Promise = fs.promises.readFile('f1.txt');
// console.log(f1Promise);

// f1Promise.then(function(data){
//     console.log(data+"");
// })

// f1Promise.catch(function(error){
//     console.log(error);
// })

f1Promise.then(function(data){
    console.log(data+"");
}).catch(function(error){
    console.log(error);
})
