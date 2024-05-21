// in JavaScript objects are like key value pair 

// create an empty object 
// var obj = {};
// console.log(obj);

// var person = {
//     name:"Starc",
//     age:35,
//     phone:43904839,
//     isMale:true,
//     teammates:["Pat","Head","Warner"]
// }
// console.log(person)

// var a = "age"

// //dot notation
// console.log(person.name)
// console.log(person.age);

// // bracket notation 
// console.log(person.a) //it will convert a into string "a" and then try to find "a" in obj
// console.log(person[a]); // it will use a as variable and use value of it
// console.log(person["name"]);//it will search in obj with key "name"

var capAmerica = {
    name:"Steve Rogers",
    age:99999999,
    friends:["Bucky","Tony","Natasha",'Sam','Bruce'],
    sayHi:function(){
        console.log("Steve says Hi");
    },
    address:{
        country:"USA",
        city:{
            state:"Queen",
            pincode:12324
        }
    },
    isAvenger:false
}

//READ
// console.log(capAmerica.age);
// console.log(capAmerica["age"]);
// console.log(capAmerica.friends[0]);
// console.log(capAmerica["friends"][0]);
// console.log(capAmerica.address.country);
// console.log(capAmerica["address"]["country"])
// console.log(capAmerica.address.city.pincode);
// console.log(capAmerica["address"]["city"]["pincode"]);
// capAmerica.sayHi();

//UPDATE
capAmerica.isAvenger = true;
// console.log(capAmerica);

//add a new key value pair to capAmerica obj
capAmerica.movies = ['First Avenger','End Game']

capAmerica.address.city.pincode = 43089583;
capAmerica.friends.push('Antman')
capAmerica.friends[0] = "Winter Soldier"
// console.log(capAmerica);

//DELETE
//delete an existing key value pair
delete capAmerica.age
// console.log(capAmerica);

capAmerica["sayHi"]();
console.log(capAmerica.name);
console.log(capAmerica["name"]);
