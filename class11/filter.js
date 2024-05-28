// filter -> its a HOF 

let arr = [234,546,5,3,657,375,8,434,7,98,23,4,6,90]

// function even(arr){
//     let newArr = [];
//     for(let i=0;i<arr.length;i++){
//         if(arr[i]%2 == 0){
//             newArr.push(arr[i])
//         }
//     }
//     return newArr;
// }

// function odd(arr){
//     let newArr = [];
//     for(let i=0;i<arr.length;i++){
//         if(arr[i]%2 == 1){
//             newArr.push(arr[i])
//         }
//     }
//     return newArr;
// }

// let evenArr = even(arr);
// console.log(evenArr);

// let oddArr = odd(arr);
// console.log(oddArr);

// function generic(arr,cb){
//     let newArr = [];
//     for(let i=0;i<arr.length;i++){
//         if(cb(arr[i])){
//            newArr.push(arr[i]); 
//         }
//     }
//     return newArr
// }

function oddCB(ele){
    return ele%2 == 1;
}

function evenCB(ele){
    return ele%2 == 0;
}

// let oddArr = generic(arr,oddCB);
// console.log(oddArr);

// let evenArr = generic(arr,evenCB);
// console.log(evenArr);

let oddArr = arr.filter(oddCB)
console.log(oddArr);
let evenArr = arr.filter(evenCB);
console.log(evenArr);

//question-> return all positive transaction
const transactions = [1000, 3000, 4000, 2000, -898, 3800, -4500];

let positiveArr = transactions.filter(function(ele){
    return ele>0;
})

console.log(positiveArr);