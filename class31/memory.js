// Primitive types -> numbers,strings,boolean,null and undefined.

let a = 10;
let b = 10;
// let c = a;
// a = 30;
// console.log(c);//? 30 or 10.
// console.log(a === b);

// a = 20;
// console.log(b)//? 10 or 20? 

//Reference data types -> objects,arrays, functions

// let obj1 = {name:"John",age:19}

// let obj2 = {name:"John",age:19};

// console.log(obj1 == obj2); //false

// let obj3 = obj1;

// obj1.name = "Alex";

// console.log(obj3.name);

// const arr = [1,2,4];
// arr.push(5);
// console.log(arr);

// const arr = [1,3,4,5];

// arr = [1,3,4,5];

// console.log(arr);


let zoo = {
    name:"Amazzing Zoo",
    location: "Australia",
    animals:[
        {species:"Lion",favTreat:"Meat"},
        {species:"Panda",favTreat:"Leaves"}
    ]
}

let zoo2 = {...zoo}; // shallow copy

// zoo2.name = "Not so amazing, copy zoo";
// console.log(zoo.name);
// console.log(zoo2.name);

// zoo2.animals[0].species = "Tiger";
// console.log(zoo);
// console.log(zoo2);

// const deepCopyZoo = JSON.parse(JSON.stringify(zoo)); // deep copy
const stringifiedValue = JSON.stringify(zoo);
const deepCopyZoo = JSON.parse(stringifiedValue);

// deepCopyZoo.animals[0].species = "Tiger";
// console.log(zoo);
// console.log(deepCopyZoo);
