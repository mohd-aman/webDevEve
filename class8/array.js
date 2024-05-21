// // empty array in js 
// // var arr = [];
// // console.log(arr);

// var arr = [1,2,3,5,'z',"I am a string",false,[12,344]];
// //indexing starts from 0
// console.log(arr);

// //access a particular value in an array
// console.log(arr[4]);

// //update a particular index
// arr[3] = "I am new value at 3rd index"
// console.log(arr);

// //check the length of array

// console.log(arr.length);

var carCollection = ["Swift","Lambo","BMW","Audi","Thar","Defenders"]

console.log(carCollection);

// push() method will add element at the end of array 
carCollection.push("Kia");
console.log(carCollection);

//pop() method removes element from the last of array
carCollection.pop();
console.log(carCollection);

//unshift method add element at the start of an array
carCollection.unshift("Rolls Royce");
console.log(carCollection);

//shift method removes element from the start of the array
carCollection.shift();
console.log(carCollection);