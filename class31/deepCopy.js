const origianlObj = {
    name:"Alice",
    details:{
        age:30,
        hobbies:['reading','cycling','hiking']
    },
    greet:function(){
        console.log(`${this.name}`);
    }
}

function deepClone(obj){
    //base case for null and primitvie
    if(obj === null || typeof obj !== "object"){
        return obj;
    }
    if(obj instanceof Array){
        let copyArr = [];
        for(let i=0;i<obj.length;i++){
            copyArr[i] = deepClone(obj[i]);
        }
        return copyArr;
    }
    if(obj instanceof Function){
        //inside here obj is funtion
        return obj.bind({});
    }
    if(obj instanceof Object){ 
        let copyObj = {};

        for(let key in obj){
            copyObj[key] = deepClone(obj[key]);
        }
        return copyObj;
    }

}

const deepCopy = deepClone(origianlObj);

deepCopy.details.hobbies[0] = "writing";
console.log(origianlObj);
console.log(deepCopy);

origianlObj.greet();
deepCopy.greet(); // why are we getting Alice if we are getting Alice or name of deepCopy
