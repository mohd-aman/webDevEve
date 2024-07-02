// to create private variable in class put # in front of variable 

class Pizza{

    #toppings;// private property
    #size; //private property
    #crustType; //private property

    constructor(toppings,size,crustType){
        this.#toppings = toppings;
        this.#size = size;
        this.#crustType = crustType;
    }

    #describe(){
        console.log(`A ${this.#size} pizza with ${this.#toppings.join(", ")} on a ${this.#crustType}`);
    }
}

const order1 = new Pizza(['cheese','orange'],'large','thin');
// console.log(order1.size); //undefined
// console.log(order1.#size); //error private field

order1.#describe();




