const person = {
    name:"John",
    age:30,
    describe:function(location){
        console.log(`${this.name} is ${this.age} years old and lives in ${location}.`);
    }
}

const person2 = {
    name:"Aman",
    age:25
}

const person3 = {
    name:"Vinod",
    age:'No idea'
}

// person.describe('USA');
// person2.describe();
// console.log(person.describe);
// set the value of this keyword in describe
//  fxn to person2 for this particular invocation
person.describe.call(person2,'Delhi');

person.describe.call(person3,'No idea');

function greet(drink,num,snacks){
    console.log(`Hi I am ${this.name} and welcome to world of javaScript`);
    console.log(drink,num,snacks);
}

const bindedFxn = greet.bind(person2,'Coffee');
bindedFxn(5,'Random Snacks');


// greet.call(person2,'Coffee',2,'some random snacks');
// greet.apply(person3,['Tea',5,' ranagaindom snacks']);

// person.describe.apply(person2,['Delhi']);

// let numbers = [1,2,3,4,5,6,7,8,0,23,5,7];

// console.log(Math.max.apply(null,numbers));
// Math.max(1,6,7,8,90,0,3,2,1)


const introduceAman = person.describe.bind(person2);
console.log(introduceAman);
introduceAman("Delhi");
introduceAman("Blr");
introduceAman("Hyd");

const introduceVinod = person.describe.bind(person3,'No idea');
introduceVinod();
introduceVinod();