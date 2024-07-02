// const pizza1 = {
//     toppings:["cheese","pepperoni"],
//     size:"Large",
//     crustType:"thick"
// }

// const customerOrder2 = {
//     toppings:['veggies','pepperoni'],
//     size:"Medium",
//     crustType:"thin"
// }

// const customerOrder3 ={
//     toppings:['mushrooms','onions'],
//     size:"Small",
//     crustType:"thick"
// }

function Pizza(toppings,size,crustType){
    // console.log(this);//newly created empty object, {} 
    this.toppings = toppings;
    this.size = size;
    this.crustType = crustType;

    this.describe = function(){
        console.log(`A ${this.size} pizza with ${this.toppings.join(", ")} on a ${this.crustType}`);
    }
}

const customerOrder1 = new Pizza(['cheese','pepperoni'],"large",'thin');
customerOrder1.describe();

const customerOrder2 = new Pizza(['cheese','pepper'],'medium','thick');
customerOrder2.describe();

const customerOrder3 = new Pizza(['veggies','paneer'],'small','normal base');
customerOrder3.describe();
