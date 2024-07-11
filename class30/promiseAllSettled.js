function fetchUserData(){
    return new Promise(function(resolve,reject){
        setTimeout(()=>resolve({userId:1,userName:"Dummy User"},1000));
    })
}

function fetchPostData(){
    return new Promise(function(resolve,reject){
        // setTimeout(()=>resolve(["post1","post2","post3"],1000));
        setTimeout(()=>reject("Error"),2000);
    })
}

Promise.allSettled([fetchUserData(),fetchPostData()])
.then(function(data){
    console.log(data);
})