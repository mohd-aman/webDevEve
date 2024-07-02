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
    constructor(toppings,size,crustType){ //automatically gets invoked when instace of this class is created
        this.toppings = toppings;
        this.size = size;
        this.crustType = crustType;
    }

    describe(){
        console.log(`A ${this.size} pizza with ${this.toppings.join(", ")} on a ${this.crustType}`);
    }

}

const customerOrder1 = new Pizza(['cheese','paneer'],'Large','thin');
// console.log(customerOrder1);
customerOrder1.describe();

const customerOrder2 = new Pizza(['cheese','veggies'],'small','thick');
// console.log(customerOrder2);
customerOrder2.describe();

const customerOrder3 = new Pizza(['pepperoni','mushrooms'],'medium','normal base');
customerOrder3.describe();