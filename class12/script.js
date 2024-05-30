console.log("1");

function cb1(){
    console.log("2");
}

function cb2(){
    console.log("4");
}

setTimeout(cb1,2000)

for(let i=0;i<1000000;i++){
    console.log("hi");
}

setTimeout(cb2,0);

console.log("3");

