// Q. Flatten an array 
// const nestedArr = [2,3,5,[3,4,7],[5,7,[54,3,7,0],3],2];
// console.log(nestedArr);

// flatten array should look like this 
// [2,3,5,3,4,7,5,7,54,3,7,0,3,2];

// Input:

// A nested array arr containing integers.
// Output:

// A single-dimensional array containing all the elements of the nested array.

// function flattenArray(arr){
    
//     return arr.reduce((accumulator,element)=>{
//         if(Array.isArray(element)){
//             accumulator.push(...flattenArray(element))
//         }else{
//              accumulator.push(element);
//         }
//         return accumulator;
//     },[]);
// }

// const output = flattenArray(nestedArr);
// console.log(output);


// Problem-2
// Problem Statement:

// You are given an array of objects representing transactions made by customers. Each object contains the following properties:

// customerId: Number, representing the unique ID of the customer.
// amount: Number, representing the amount of the transaction.
// date: String, representing the date of the transaction (in the format "YYYY-MM-DD").
// Your task is to write a JavaScript function using functional programming techniques that takes this array of transaction objects and returns an object containing the following information:

// totalTransactions: Total number of transactions.
// totalAmount: Total amount of all transactions.
// averageTransactionAmount: Average amount of transactions.
// transactionsPerDay: An object where keys are dates and values are arrays containing transactions made on that date.
// transactionsByCustomer: An object where keys are customer IDs and values are arrays containing transactions made by that customer.
// Example Input:

const transactions = [
  { customerId: 1, amount: 100, date: '2024-03-01' },
  { customerId: 2, amount: 150, date: '2024-03-01' },
  { customerId: 1, amount: 200, date: '2024-03-02' },
  { customerId: 3, amount: 50, date: '2024-03-02' },
  { customerId: 2, amount: 120, date: '2024-03-03' }
];
