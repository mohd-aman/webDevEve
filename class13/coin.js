let coinTossPromise = new Promise(function(resolve,reject){
    setTimeout(function(){
        const isHead = Math.random()>0.5;
        if(isHead){
            resolve("Heads");
        }else{
            reject("Tails - Rejection is the toss")
        }
    },1000) // simulate the 1 second coin toss
})

console.log(coinTossPromise);

coinTossPromise.then(function(data){
    console.log(data);
})

coinTossPromise.catch(function(error){
    console.log(error);
})