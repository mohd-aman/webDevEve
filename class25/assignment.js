

let obj = {
    name:'person',
    age:100,
    fxn:function(){
        
        return ()=>{
            console.log(this.name);
        }
    }
}

let returnedInnerFxn = obj.fxn();
returnedInnerFxn(); 



let obj2 = {
    name:'person',
    age:100,
    fxn:function(){
        console.log(this.age)
        const arrowFxn= ()=>{
            console.log(this.name);
        }
        arrowFxn();
    }
}

obj2.fxn();

let fxnExpression = obj2.fxn;
fxnExpression();