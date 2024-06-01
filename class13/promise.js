let myPromise = new Promise(function(resolve,reject){
    let a = 5;
    let b = 5;
    if(a == b){
        resolve("Success!! Yay variables are equal");
    }else{
        reject("OOPs, not equal");
    }
})

// if promise is fulfilled we do it in then method
function cbs(data){
    console.log("I am inside success callback")
    console.log(data);
}
myPromise.then(cbs)

//if promise is rejected we do it catch method
myPromise.catch(function(error){
    console.log("I am inside failure callback");
    console.log(error);
})

// myPromise.finally(function(){
//     console.log("I will run whenever promise is no longer in pending state")
// })