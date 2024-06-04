const fs = require('fs');

async function readFilesOneByOne(){
    try{
        let data1 = await fs.promises.readFile('file1.txt');
        console.log(data1+"");
        let data2 = await fs.promises.readFile('file2.txt');
        console.log(data2+"")
        let data3 = await fs.promises.readFile('file3.txt');
        console.log(data3+"");
    }catch(error){
        console.log(error);
    }
}

readFilesOneByOne();