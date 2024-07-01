

// function fxn(){
// console.log(this);
// }

// fxn();

// console.log(this);

// const arrowFxn = ()=>{
//     console.log(this);
// }

// arrowFxn();

let obj ={
    name:"person",
    age:"100",
    arrowFxn:()=>{
        console.log(this);
    }
}

obj.arrowFxn();

let fxnExpression = obj.arrowFxn;
fxnExpression();