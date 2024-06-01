console.log("1");

setTimeout(function(){
    console.log("4");
},0)

Promise.resolve().then(function cbp(){
    console.log("2");
})

Promise.resolve().then(function(){
    console.log("5");
})

console.log("3");