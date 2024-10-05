// Why Streams? 
// to efficiently handle large files or data or media, without consuming excessing memory or blocking other operation

// What is streams? 
// allow data to be processed in smaller chunks

// 4 Types of streams 

// 1.Readable
// 2.Writable
// 3. Duplex : Socket 
//4. Transform Stream: Changes form form one to another. 

const fs = require('fs');

const readableStream = fs.createReadStream('big.file');
const writeStream = fs.createWriteStream('copyOfBig.file');

// readableStream.on('data',(chunk)=>{
//     console.log(`Received ${chunk.length} bytes`);
//     writeStream.write(chunk);
// })

// readableStream.on('end',()=>{
//     writeStream.end();
//     console.log('Finished reading the file');
// })

readableStream.pipe(writeStream);

readableStream.on('error',(err)=>{
    console.log('Error encountered',err);
})

writeStream.on('error',(err)=>{
    console.log('Error encountered while writing',err);
})