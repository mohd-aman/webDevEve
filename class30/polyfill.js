// input -> [promise1,promise2,promise3,promise4];

function fetchUserData(){
    return new Promise(function(resolve,reject){
        // setTimeout(()=>resolve({userId:1,userName:"Dummy User"},1000));
    })
}

function fetchPostData(){
    return new Promise(function(resolve,reject){
        // setTimeout(()=>resolve(["post1","post2","post3"],1000));
        // setTimeout(()=>reject("Error"),500);
    })
}


Promise.myAll = function(arr){
    return new Promise(function(resolve,reject){
        let result = [];
        let totalResolvedPromise = 0;
        arr.forEach(function(item,index){
            Promise.resolve(item).then((res)=>{
                result[index] = res;
                totalResolvedPromise++;
                if(totalResolvedPromise === arr.length){
                    resolve(result);
                }
            }).catch((error)=>{
                reject(error);
            })
        })
    })
}

// Promise.myAll([fetchUserData(),fetchPostData(),3])
// .then(function(data){
//     console.log(data);
// })
// .catch(function(err){
//     console.log(err);
// })

// Promise.resolve(item) -> if item is already a promise then no issue it is same as item
// -> IF IT is value then it returns a promise and the resolve value will be item itself.

Promise.myAny = function(arr){
    return new Promise(function(resolve,reject){
        let totalRejectedPromise = 0;
        arr.forEach(function(item,index){
            Promise.resolve(item).then(function(res){
                resolve(res);
            })
            .catch(function(error){
                totalRejectedPromise++;
                if(totalRejectedPromise === arr.length){
                    reject("failed all promises rejected")
                    // reject(new AggregateError("All the promises rejected"))
                }
            })
        })
    })
}

// Promise.myAny([fetchUserData(),fetchPostData(),3])
// .then(function(data){
//     console.log(data);
// })
// .catch(function(error){
//     console.log(error);
// })


Promise.myRace = function(arr){
    return new Promise(function(resolve,reject){
        arr.forEach(function(item,index){
            item.then(function(res){
                resolve(res);
            })
            .catch(function(error){
                reject(error);
            })
        })
    })
}

Promise.myRace([fetchPostData(),fetchUserData()])
.then(function(data){
    console.log(data);
}).catch(function(error){
    console.log(error);
})