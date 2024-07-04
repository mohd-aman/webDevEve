// const person ={
//     name:"John",
//     age:"30"
// }

// console.log(person);

const car = {
    name:"Alto",
    color:"green"
}

console.log(car);

console.log(car.hasOwnProperty("color"));

const arr = ['blue','red','green','yellow'];
arr.pop();
arr.push('black');
console.log(arr);


function Car(model,year){
    this.model = model;
    this.year = year;

    //method to display car details
    // this.describe = function(){
    //     console.log(`This is a ${this.year} ${this.model}`);
    // }
}

//Adding descrbie function to prototype of Car
Car.prototype.describe = function(){
    console.log(`This is a ${this.model} ${this.year} `);
}

// setting a generic method via __proto__ not recommended 
Car.prototype.__proto__.customFxn = function(){
    console.log("custom function");
}

const car1 = new Car('Toyota','2000');
console.log(car1);

const car2 = new Car('Ford Mustang','2024');
console.log(car2);

const car3 = new Car('Lambo','2010');
console.log(car3);

// console.log(car1.hasOwnProperty('model'));
console.log(car1.hasOwnProperty("model"));

car1.describe();
car2.describe();
car3.describe();


