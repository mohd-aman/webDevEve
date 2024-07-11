function quickResolve(){
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            resolve("Quickly Resolvd");
        },3000)
    })
}

function slowResolveOrFastReject(){
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            resolve("Slow Resolved");
        },2000)
        setTimeout(function(){
            reject("Fast Reject");
        },1000)
    })
}

Promise.race([quickResolve(),slowResolveOrFastReject()])
.then(function(data){
    console.log(data);
})
.catch(function(err){
    console.log(err);
})