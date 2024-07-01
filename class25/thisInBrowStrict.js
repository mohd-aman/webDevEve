'use strict'

// console.log(this); //window object

// function fxn(){
//     console.log(this); //undefined
// }

// fxn();

let obj = {
    name:"Vinod",
    age:"no idea",
    fxn:function(){
        // console.log(this);
        console.log(this.age);
        (function(){
            console.log(this.age);
        })();
    }
}

obj.fxn();
// let fxnExpression = obj.fxn;
// fxnExpression(); //undefined.name

// let returnedInnerFxn = obj.fxn();
// returnedInnerFxn(); 