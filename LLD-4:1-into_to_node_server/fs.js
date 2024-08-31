const fs = require('fs'); // file system

// console.log(fs);

//read the file async example.txt

fs.readFile('example.txt',function(err,data){
    if(err){
        console.log(err);
    }else{
        console.log(data+"");
    }
})

// const content = "Updated Hello World!";

// fs.writeFile('example2.txt',content,function(err){
//     if(err){
//         console.log(err);
//     }else{
//         console.log("File has been written successfully")
//     }
// })

// fs.rename('example2.txt','new-file.txt',function(err){
//     if(err){
//         console.log(err);
//     }else{
//         console.log("File has been renamed successfully")
//     }
// })

// fs.unlink('new-file.txt',function(err){
//     if(err){
//         console.log(err);
//     }else[
//         console.log("File has been deleted successfully")
//     ]
// })

// const directoryName = "my-directory";

// fs.mkdir(directoryName,function(err){
//     if(err){
//         console.log(err);
//     }else{
//         console.log("Directory has been created successfully")
//     }
// })


//to check if a directroy exists

if(fs.existsSync('my-directory')){
    console.log("Directory exists")
}else{
    console.log("Directory does not exist");
}

//homework you can try to organize a folder basically create folders for 
// photos, videos, images, document and other
// put files to corresponding folders