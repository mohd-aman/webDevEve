function resolveQuickly(){
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            // resolve("Quickly Resolved");
            reject("fast reject");
        },500)
    })
}

function resolveSlowly(){
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            resolve("Slowly Resolved");
            // reject("slowest reject");
        },2000)
    })
}

function rejectFast(){
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            reject("Fastly Rejected");
        },100)
    })
}

function rejectSlow(){
    return new Promise(function(resolve,reject){
        setTimeout(function(){
            reject("Slowly Rejected");
        },1500)
    })
}

Promise.any([rejectFast(),rejectSlow(),resolveQuickly(),resolveSlowly()])
.then(function(data){
    console.log(data);
})
.catch(function(err){
    console.log(err);
})