// console.log(this); // {}

//normal fxn
// function fxn(){
//     console.log(this); // global object
// }

// fxn(); // directly invoking it


let obj = {
    name:"SKY",
    age:"30",
    fxn:function(){
        // console.log("fxn",this); // what will be printed
        function gxn(){
            console.log("gxn",this); // what will be printed
        }
        gxn();
    }
}

obj.fxn(); // invoking fxn through an object -> object itself

// let a = obj.name;
// console.log(a);
let fxnExpression = obj.fxn; // function fxn(){console.log(this);}
// fxnExpression();
