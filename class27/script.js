// const person ={
//     name:"John",
//     age:"30"
// }

// console.log(person);

// const car = {
//     name:"Alto",
//     color:"green"
// }

// console.log(car);

// console.log(car.hasOwnProperty("color"));

// const arr = ['blue','red','green','yellow'];
// arr.pop();
// arr.push('black');
// console.log(arr);


// function Car(model,year){
//     this.model = model;
//     this.year = year;

//     //method to display car details
//     // this.describe = function(){
//     //     console.log(`This is a ${this.year} ${this.model}`);
//     // }
// }

//Adding descrbie function to prototype of Car
// Car.prototype.describe = function(){
//     console.log(`This is a ${this.model} ${this.year} `);
// }

// // setting a generic method via __proto__ not recommended 
// Car.prototype.__proto__.customFxn = function(){
//     console.log("custom function");
// }

// const car1 = new Car('Toyota','2000');
// console.log(car1);

// const car2 = new Car('Ford Mustang','2024');
// console.log(car2);

// const car3 = new Car('Lambo','2010');
// console.log(car3);

// // console.log(car1.hasOwnProperty('model'));
// console.log(car1.hasOwnProperty("model"));

// car1.describe();
// car2.describe();
// car3.describe();


// const carPrototype = {
//     displayInfo:function(){
//         console.log(`This is a ${this.name} of ${this.model}`);
//     }
// }


// const car5 = Object.create(carPrototype);
// car5.name = 'Swift';
// car5.model = '2020'
// console.log(car5);

// const car6 = Object.create(carPrototype);
// car6.name = 'Lambo';
// car6.model = '2015';
// car6.color = 'black';
// console.log(car6);

// car5.displayInfo();
// car6.displayInfo();


// Question 1: Setting __proto__ to null


// let obj = { name: 'Sample Object' };
// console.log(obj);
// console.log(obj.hasOwnProperty('name'));  

// obj.__proto__ = null;
// try {
//     console.log(obj.hasOwnProperty('name'));  
// } catch (e) {
//     console.log("Error:", e.message);
// }


// Q. Global Prototype Modification

// Question: If Object.prototype.method = function() {} is defined,
// how does it affect new and existing objects?
//  Why might this be a bad practice?


// Question 4: Circular Prototype Chain
// Can you create a circular prototype chain in JavaScript?
//  What would be the consequences of doing so?

// console.log("Circular prototype chain");
// function A(){

// }

// function B(){

// }

// const a = new A();
// const b = new B();

// A.prototype = b;

// console.log(a);
// console.log(b);
// try{
//     B.prototype = a;
// }catch(error){
//     console.log(error.message);
// }

// Q . Direct Prototype Assignment
// Consider the following code snippet.
//  What is the output of each console.log statement and why?

// function Cat(name) {
//     this.name = name;
// }

// const fluffy = new Cat("Fluffy");
// console.log(fluffy);

// fluffy.__proto__ = { age: 5 };

// console.log(fluffy);
  
// console.log(fluffy.age); // 5
// console.log(fluffy.hasOwnProperty('age')); //false
// console.log(Cat.prototype);
// console.log(fluffy.__proto__);
// console.log(fluffy.__proto__ === Cat.prototype);//false


// Assignment
// const cat2 = new Cat('Aamy');
// console.log(fluffy.__proto__ === cat2.__proto__);