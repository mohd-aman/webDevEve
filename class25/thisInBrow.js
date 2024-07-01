// console.log(this);// window object 

// function fxn(){
//     console.log(this) //window object
// }

// fxn(); // directly invoking it


let obj = {
    name:"person",
    age:"no idea",
    fxn:function(){
        // console.log(this);
        return function(){
            console.log(this);  
        }
    }
}
 
// obj.fxn(); //method invocation, object itself

// let fxnExpression = obj.fxn; // function(){console.log(this};
// fxnExpression(); //function invocation, direct invocation

let returnedInnerFxn = obj.fxn();
returnedInnerFxn();