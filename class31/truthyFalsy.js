//Falsy value in js 
// 1. false
// 2. 0, -0
// 3. null
// 4. ""
// 5. undefined
// 6. NaN

// if({}){
//     console.log("Emtpy array is truthy")
// }else{
//     console.log("Empty array is falsy")
// }

// if([]){
//     console.log("Truthy")
// }else{
//     console.log("Falsy");
// }

// if(""){
//     console.log("Truthy");
// }else{
//     console.log("Falsy");
// }

// const truthyValues = [1, -1, "hello", {}, [], () => {}];

// truthyValues.forEach((value)=>{
//     if(value){
//         console.log(value,"Truthy")
//     }else{
//         console.log(value,"Falsy");
//     }
// })


const message = "";
if(!message){
    console.log("No message provided");
}

const port = process.env.PORT || 3000;


function greet(name){
    name = name || "Guest";
}