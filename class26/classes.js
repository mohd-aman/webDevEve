// class MyClass{
//     constructor(){
//         //Initializing the properties of the class
//     }

//     myMethod(){

//     }
    // static myStaticMethod(){

    // }
// }


class Pizza{
    static totalPizzasMade = 0; //static property to keep count of pizza made
    
    constructor(toppings,size,crustType){ //automatically gets invoked when instace of this class is created
        this.toppings = toppings;
        this.size = size;
        this.crustType = crustType;
        Pizza.totalPizzasMade++; //accessing static property.
    }

    describe(){
        console.log(`A ${this.size} pizza with ${this.toppings.join(", ")} on a ${this.crustType}`);
    }

    static getTotalPizzasMade(){
        console.log(`Total pizza made: ${Pizza.totalPizzasMade}`);
    }
}

//create a class StuffedCrustPizza which inherits Pizza
class StuffedCrustPizza extends Pizza{

    constructor(toppings,size,crustType,stuffingType){
        super(toppings,size,crustType) //to invoke constructor method of parent
        this.stuffingType = stuffingType;
    }
    describeStuffing(){
        console.log(`Stuffed with ${this.stuffingType}`);
    }

    //override the describe method of parent class
    describe(){
        super.describe(); // invoking describe method of parent class.
        this.describeStuffing(); //invoking method of own class.
    }
}

const customerOrder1 = new Pizza(['cheese','paneer'],'Large','thin');
// console.log(customerOrder1);
// customerOrder1.describe();

let specialOrder2 = new StuffedCrustPizza(['cheese','mushrooms'],'large','thin','garlic and chees')
// console.log(specialOrder2);
specialOrder2.describe();

Pizza.getTotalPizzasMade();

console.log(Pizza.totalPizzasMade);

const customerOrder2 = new Pizza(['cheese','veggies'],'small','thick');
// console.log(customerOrder2);
// customerOrder2.describe();

const customerOrder3 = new Pizza(['pepperoni','mushrooms'],'medium','normal base');
// customerOrder3.describe();

Pizza.getTotalPizzasMade();

// without inheritance
// class StuffedCrustPizza{

//     constructor(toppings,size,crustType,stuffingType){
//         this.toppings = toppings;
//         this.size = size;
//         this.crustType = crustType;
//         this.stuffingType = stuffingType;
//     }

//     describe(){
//         console.log(`A ${this.size} pizza with ${this.toppings.join(", ")} on a ${this.crustType}`);
//         console.log(`Stuffed with ${this.stuffingType}`);
//     }

// }

// const specialOrder = new StuffedCrustPizza(['cheese','mushroom'],'Large','thick','cheese and garlic');
// console.log(specialOrder);
// specialOrder.describe();