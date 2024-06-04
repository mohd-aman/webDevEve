const p = new Promise(function(resolve,reject){
    setTimeout(function(){
        resolve('5');
    },5000)
})
 
// function fxn(){
//     p.then(function(data){
//         console.log(data);
//     })
//     console.log("impact created")
// }

// fxn();

const p1 = new Promise(function(resolve,reject){
    setTimeout(function(){
        resolve('7')
    },3000)
})

const p2 = new Promise(function(resolve,reject){
    setTimeout(function(){
        resolve('4');
    },5000)
})

async function fxn(){
    // console.log('8');
    const a = await p1;
    console.log(a);
    // console.log('2');
    const b = await p2;
    console.log(b);
}

// console.log("1");
fxn();
// console.log("3");
