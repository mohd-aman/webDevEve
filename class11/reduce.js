// function getSum(arr){
//     let sum = 0;
//     for(let i=0;i<arr.length;i++){
//         sum = sum+arr[i];
//     }
//     return sum;
// }

// function getSubstraction(arr){
//     let ans = 0
//     for(let i=0;i<arr.length;i++){
//         ans = ans - arr[i];
//     }
//     return ans;
// }

// function getMultiply(arr){
//     let ans = arr[i];
//     for(let i=1;i<arr.length;i++){
//         ans = ans*arr[i]
//     }
//     return ans;
// }

let arr = [1,2,3,4,5];

// let sum = getSum(arr);
// console.log(sum);

function cb(accumulator,ele){
    accumulator = accumulator+ele;
    return accumulator;
}

let sum = arr.reduce(cb)
console.log(sum);

let multiply = arr.reduce(function(acc,ele){
    acc = acc*ele;
    return acc;
},1)

console.log(multiply);
