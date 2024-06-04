// function fxn(){
//     return 'I am a string';
// }

// const a = fxn();
// console.log(a);

// async function fxn(){
//     return 'I am string';
// }

// const a = fxn();
// console.log(a);
// a.then(function(data){
//     console.log(data)
// })

const p = new Promise(function(resolve,reject){
    resolve("Promise Resolved");
})

async function fxn(){
    return p;
}

const a = fxn();
// console.log(a);
// a.then(function(data){
//     console.log(data);
// })
