//Objective -> serial task asynchronously
const fs = require("fs");

fs.readFile('f1.txt',function(error,data){
    if(error){
        console.log(error);
    }else{
        console.log(data+"");
        fs.readFile("f2.txt",function(error,data){
            if(error){
                console.log(error);
            }else{
                console.log(data+"")
                fs.readFile("f3.txt",function(error,data){
                    if(error){
                        console.log(error);
                    }else{
                        console.log(data+"");
                    }
                })
            }
        })
    }
})
