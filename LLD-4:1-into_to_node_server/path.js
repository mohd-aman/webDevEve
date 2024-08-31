// /Users/interviewbit/Desktop/webDevEvening/class34

// \\Users\\interviewbit\\Desktop\\webDevEvening\\class34

const path = require('path');

// console.log(path);

const destination = path.join('folder','subfolder','file.txt');
'folder/subfolder/file.txt'
console.log(destination);

const absolutePath = path.resolve('folder','subfolder','file.txt');

// /Users/interviewbit/Desktop/webDevEvening/into_to_node_server/folder/subfolder/file.txt
console.log(absolutePath);

const fileName = path.basename('/Users/interviewbit/Desktop/webDevEvening/class29/interviewQuestions.js');
console.log(fileName);

console.log(__dirname);
