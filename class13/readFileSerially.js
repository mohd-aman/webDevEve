const fs = require('fs');

let f1Promise = fs.promises.readFile('f1.txt');

// f1Promise.then(function(data){
//     console.log(data+"");
//     let f2Promise = fs.promises.readFile('f2.txt');
//     f2Promise.then(function(data){
//         console.log(data+"");
//         let f3Promise = fs.promises.readFile('f3.txt');
//         f3Promise.then(function(data){
//             console.log(data+"")
//         })
//     })
// }).catch(function(error){
//     console.log(error);
// })

//Promise chaining
f1Promise.then(function(data){
    console.log(data+"");
    return fs.promises.readFile('f2.txt');
}).then(function(data){
    console.log(data+"");
    return fs.promises.readFile('f3.txt');
}).then(function(data){
    console.log(data+"")
}).catch(function(error){
    console.log(error);
})


