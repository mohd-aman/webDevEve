"use strict";

// console.log(this); // {}

// function fxn(){
//     console.log(this); // undefined
// }

// fxn(); // directly invoking it

let obj = {
    name:"person",
    age:"no idea",
    fxn:function(){
        console.log("fxn",this); //object itself, incase of method invocation
        function gxn(){
            console.log("gxn",this); //undefined
        }
        gxn(); //function invocation
    }
}

obj.fxn(); // object itself, it's a method invocation 

let fxnExpression = obj.fxn; //function (){console.log(this);}
// fxnExpression();

// obj.gxn -> undefined, undefined();
// obj.gxn();