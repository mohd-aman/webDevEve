//implementation of call polyfill. 

function greet(place){
    console.log(`Hello ${this.name}`);
    console.log(place);
}

const person = {
    name:"John",
}


Function.prototype.myCall = function myCall(obj, ...args){
    console.log("our own call method")

    if(typeof this !== 'function'){
        throw new Error('Not a function');
    }

    // console.log(this);//fxn //function greet(){console.log(`Hello ${this.name}`);}
    // console.log(obj); // objperson = {name:"John"}
    obj.myFxn = this; // {myFxn:[Functio]}
    // person={name:"John",myFxn:function greet(){console.log(`Hello ${this.name}`);}}
    // console.log(obj);
    obj.myFxn(...args);
    delete obj.myFxn;
    // objperson = {name:"John"}
    // console.log(obj);
}

// greet.call(person);

// greet.myCall(person);
// greet.myCall(person,'Delhi')


Function.prototype.myApply = function(obj={},argArray=[]){
    // this -> fxn 
    // obj -> obj. 
    // so we put fxn in the obj as key value pair once we have it we can call it through obj 
    obj.myFxn = this;
    obj.myFxn(...argArray);
    delete obj.myFxn;
}

// greet.myApply(person,['Delhi','Blr','Hyd'])

Function.prototype.myBind = function(obj,...boundArgs){
    // this -> fxn 
    const myFxn = this;
    return function(...args){
        return myFxn.myCall(obj,...boundArgs,...args);
    }
}

const bindedFxn = greet.myBind(person,'Delhi')
bindedFxn();
bindedFxn();