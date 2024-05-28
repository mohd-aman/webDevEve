
// function gxn(){
//     console.log("Hello I am gxn")
// }

// function fxn(cbFxn){
//     console.log(cbFxn);
//     console.log("Hello I am a fxn");
//     cbFxn();
// }


// fxn(gxn);

function hof(cbFxn){
    console.log("I am higher order fxn as i am accepting a function in argument");
    cbFxn();
}

function cb(){
    console.log("I am a callback function as i will be passed in arguments of another fxn");
}

hof(cb);

