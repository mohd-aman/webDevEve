let arr = [3, 3,34,3,23];

// arr.push(10);
console.log(arr);


//Polyfill of map.
// double each element of the array. 
// let doubleArr = arr.map(function(elem,index){
//     console.log(elem);
//     console.log(index);
//     return 2*elem;
// })


// console.log(doubleArr);

Array.prototype.myMap = function myMap(callbackFxn){
    console.log(this);  
    if(typeof callbackFxn !== 'function'){
        throw new TypeError(`${callbackFxn} is not a function`)
    }
    const arr = this; // array through which myMap was invoked.
    let newArr = [];
    for(let i=0;i<arr.length;i++){
        console.log(i);
        if(i in arr){ // checking for sparse arrays.
            const elem = arr[i];
            newArr[i] = callbackFxn(elem,i);
        }
        
    }
    return newArr;
}


// let doubleArr = arr.myMap(function(elem){
//     return 2*elem;
// }); // method invocation.

// console.log(doubleArr);

// let c = [3,4,5,68,6,4];
// const d = c.myMap(function(elem,index){
//     console.log(elem);
//     console.log(index);
//     return 3*elem;
// })
// console.log(d)

// const w = c.myMap(4);

// function even(elem,index){
//     return elem%2 === 0;
// }

// const evenArr = arr.filter(even)

// console.log(evenArr);

Array.prototype.myFilter = function myFilter(callbackFxn){
    console.log(this);//array
    if(typeof callbackFxn !== 'function'){
        throw new TypeError(`${callbackFxn} is not a function`)
    }
    const arr = this;
    let newArr = [];
    for(let i=0;i<arr.length;i++){
        const elem = arr[i];
        if(callbackFxn(elem,i)){
            newArr.push(elem);
        }
    }
    return newArr;
}

// const evenArr2 = arr.myFilter(even)
// console.log(evenArr2);


Array.prototype.myReduce = function myReduce(callbackFxn,initialValue){
    if(typeof callbackFxn !== 'function'){
        throw new TypeError(`${callbackFxn} is not a function`);
    }
    
    console.log(this);//array;
    const arr = this;

    if(arr.length === 0 && arguments.length === 1){
        throw new Error("Reduce of empty array with no initial value")
    }

    let accumulator = initialValue?initialValue:arr[0];
    let startIndex = initialValue?0:1;
    for(let i=startIndex;i<arr.length;i++){
        if(i in arr){ //sparse array element
            const elem = arr[i];
            accumulator = callbackFxn(accumulator,elem);
        }
    }
    return accumulator;
}


function reduceCallback(accumulator,element){
    return accumulator + element;
}


// const sum = [].reduce(reduceCallback)
// console.log(sum);
const sum2 = [].myReduce(reduceCallback);
console.log(sum2);