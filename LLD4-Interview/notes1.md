# Class 14 - MERN Interview Questions


---
title: Agenda
description: Agenda.
duration: 1260
card_type: cue_card
---



## Agenda

### Node.js Modules

#### Inbuilt Modules

Inbuilt modules are integrated into Node.js and can be used without any additional installation. They provide core functionalities like file system access, HTTP server creation, path manipulation, and more.

**Examples:**

- **http**: For creating HTTP servers.
- **fs**: For handling file system operations.
- **path**: For working with file and directory paths.

#### Local Modules

Local modules are custom modules created in a project. They help in structuring and organizing code into different files and directories.

**Creating & Using**: You can create a local module by exporting functions, objects, or variables from a file using `module.exports` and then require them in other files as needed.

#### Third Party Modules

Third-party modules are libraries or packages developed by the community, available through npm (Node Package Manager).

**Usage**: They are installed using `npm install <package_name>` and included in your project using `require()`.

### Node.js Streams

Streams are collections of data that might not be available all at once and don't have to fit in memory. They allow handling of reading/writing files, network communications, or any kind of end-to-end information exchange in an efficient way.

**Example**: In video streams, a portion of the video is buffered (pre-loaded) and played while the next portion is being downloaded. This approach ensures a smooth viewing experience without requiring the entire file to be downloaded first.

### Child Process

Allows Node.js to run system commands, invoke scripts, or spawn new processes. Useful for leveraging OS-level features and handling CPU-intensive tasks.

**Doing Process Heavy Tasks**: Node.js is single-threaded, and CPU-intensive tasks can block the event loop, affecting performance.

**Child Processes**: Offload heavy computation to child processes using the `child_process` module.

### Node.js Overview

- **JavaScript on the Server**: Traditionally, JavaScript was used only in web browsers. Node.js allows you to use JavaScript to write server-side code, meaning you can write the logic that runs on your server using JavaScript.
- **Runtime Environment**: It's not a programming language or a framework, but a runtime environment that allows JavaScript to be run on the server side.
- **Built on Chrome's V8 Engine**: Node.js runs on the V8 JavaScript engine, which powers Google Chrome. This means it's incredibly fast and efficient at running JavaScript code.

#### Main Features

- **Non-Blocking, Event-Driven Architecture**: Designed to handle asynchronous operations, allowing it to manage multiple operations concurrently without waiting for any to complete. This makes it very efficient for tasks like reading/writing to the file system, network operations, or any operations that rely on external data sources.
- **Single-Threaded**: Despite being single-threaded, it can handle numerous concurrent connections efficiently due to its event-driven nature and use of callbacks or promises.
- **Non-Blocking**: Similar to waiters in a restaurant, Node.js doesn’t wait for tasks like reading files or database queries to finish before moving on to the next task. It starts a task, and while it's being processed, Node.js can start handling another task.
- **Event-Driven**: When an event occurs, Node.js reacts by executing the code meant to handle that event (like processing the file or responding to the user's request).

### Browsers and Node.js

Both use Google's V8 JavaScript engine to compile JavaScript into native machine code. This engine is known for its performance and efficiency. Both support JavaScript, meaning the core syntax and standard JavaScript functions are the same across both platforms.

#### APIs and Global Objects

- **Browsers**: Provide a runtime environment for client-side JavaScript, enabling interaction with web pages (DOM manipulation), handling user events, and rendering content.
- **Node.js**: Provides a server-side runtime environment. It extends JavaScript capabilities to interact with the filesystem, perform network operations, and run applications outside of a browser context.

#### Availability of APIs

- **Browser Environment and APIs**: In a web browser, APIs like the DOM, fetch, and others are directly available as part of the browser's global environment. You don't need to import them using `require` or any other import mechanism.
- **Node.js Environment and APIs**: Node.js uses a module system (CommonJS, specifically). Most of its core functionality, like file system (`fs`), networking (`http`), path operations (`path`), etc., are organized as modules. To use these modules, you need to import them into your script using the `require` function.

---
title: Code Examples
description: Agenda.
duration: 1260
card_type: cue_card
---


## Code Example

Create a folder `nodeDiscussion` and a file `nodeExplorer.js`:

```javascript
console.log(global);
console.log("dir name", __dirname, "file name", __filename);
```

Observe the methods like `clearTimeout`, `setInterval`, etc., are part of the global object. Notice the directory name and file name. Other features like `fs`, `path`, `http`, etc., are modules and need to be included in the code.

Try doing:

```javascript
console.log(process);
```

- **process.env**: Stores environment variables as key-value pairs. Commonly used to access system environment variables or set configuration options for the application.
- **process.cwd()**: Returns the current working directory of the Node.js process.
- **process.argv**: An array containing the command-line arguments passed when the Node.js process was launched.
- **process.pid**: The process ID of the Node.js process.
- **process.stdin, process.stdout, process.stderr**: Streams for interacting with input/output.

```javascript
console.log(process.moduleLoadList);
```

This array contains the names of the built-in modules that have been loaded by the process. It's useful for debugging or understanding which modules your application is using.

## Some Awesome Resources

- [Awesome Node.js](https://github.com/sindresorhus/awesome-nodejs): This repository is a valuable resource for anyone looking to explore the Node.js ecosystem, find useful packages, or learn more about Node.js development.
- [Awesome React](https://github.com/enaqx/awesome-react)
---
title: Problem-1
description: Agenda.
duration: 1260
card_type: cue_card
---
## Problem Statement 1

Copy a large file in the folder. If you want to generate large files with code:

```javascript
// Generate random content
const content = Math.random().toString(36).repeat(10000000); // Approximately 130MB

// Write content to file
fs.writeFileSync('/Users/scaler/Documents/BEAug16/be-16aug/nodeDiscussion/big.file', content);
```

When a user requests a large file, how do you serve them?

**Problem Statement**: How can a Node.js application effectively serve large files, such as a 400MB video, without exhausting the server's RAM and cache resources?

Create a basic server using the `http` module:

```javascript
const http = require('http');
const server = http.createServer();

server.listen(3000, () => {
  console.log("Server started at 3000");
});
```

Adding a listener for the request event when someone sends a request to our server:

```javascript
const fs = require('fs');

server.on('request', (req, res) => {
  fs.readFile('./big.file', (err, data) => {
    if (err) throw err;
    res.end(data);
  });
});
```

In the terminal, do `curl http://localhost:3000`. Notice the memory jump because the file was first brought into the memory and then served.

**Solution**: Streaming
---
title: Problem-2
description: 
duration: 1260
card_type: cue_card
---
## Problem Statement 2

There can be certain tasks that are CPU-intensive like image processing, video encoding, etc. We will take the example of Fibonacci computation. Create another file `cpu.js`:

```javascript
const express = require('express');
const cors = require('cors');
const app = express();

function calculateFibonacci(number) {
  if (number <= 1) {
    return number;
  }
  return calculateFibonacci(number - 1) + calculateFibonacci(number - 2);
}

app.use(cors());

app.get('/fib', (req, res) => {
  const { number, requestNumber } = req.query;
  console.log("handler fn ran for req", requestNumber);
  if (!number || isNaN(number) || number <= 0) {
    return res.status(400).json({ error: 'Please provide a valid positive number.' });
  }
  const answer = calculateFibonacci(number);
  res.status(200).json({
    status: "success",
    message: answer,
    requestNumber
  });
});

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});
```

Create a `cpu.html` file and have this code:

```html
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <title>Fetch Request on Button Click</title>
</head>
<body>
  <h1>Fetch Request on Button Click</h1>
  <button id="fetchButton">Fetch Data</button>
  <script>
    console.log("Fetching data...");
    let requestNumber = 0;

    function fetchData() {
      console.log("sending request", requestNumber);
      fetch('http://localhost:3000/fib?number=' + 40 + '&requestNumber=' + requestNumber++)
        .then(response => response.json())
        .then(data => {
          console.log('Response:', data);
        })
        .catch(error => {
          console.error('Error fetching data:', error);
        });
    }

    document.getElementById('fetchButton').addEventListener('click', function () {
      const countId = setInterval(fetchData, 100

);
      setTimeout(() => {
        clearInterval(countId);
      }, 5000);
    });
  </script>
</body>
</html>
```

For I/O operations (like reading from a file or database), Node.js uses non-blocking, asynchronous calls, allowing the event loop to continue handling other tasks while waiting for the I/O operation to complete. However, CPU-bound tasks like Fibonacci computation don't yield control back to the event loop until they are fully completed. This leads to a situation where the server becomes unresponsive or significantly slow in handling new requests.
---
title: LibUV
description: Agenda.
duration: 1260
card_type: cue_card
---
## Understanding the Role of Libuv in Request Handling

**libuv**: It's a cross-platform C library that Node.js uses under the hood. It provides asynchronous I/O capabilities, handling operations like file system operations, networking, and timers.

**Request Flow**:
- When a request arrives, it's initially handled by the operating system's networking layer.
- libuv then picks up the request from the OS and queues it for processing by Node.js.
- If the Node.js server is busy (e.g., executing a CPU-intensive task), libuv holds incoming requests in a queue. Once the server is ready to process new requests, libuv forwards them to Node.js.

This mechanism ensures efficient handling of I/O operations and concurrency in Node.js, but it doesn't prevent the blocking of the event loop by synchronous, CPU-intensive tasks. 

**Solution**: Spin up a new process (child process) to delegate.

## Other Important Modules
---
title:OS module
description: Agenda.
duration: 1260
card_type: cue_card
---
### OS Module

Create a new file `os.js`:

```javascript
const os = require('os');

console.log("arch", os.arch());
console.log("cpus", os.cpus());
console.log("freemem", os.freemem());
console.log("platform", os.platform());
console.log("release", os.release());
```

**Network Interface**:

```javascript
console.log(os.networkInterfaces());
```
---
title: Path Module
description: Agenda.
duration: 1260
card_type: cue_card
---
### Path Module

Windows typically uses backslashes (`\`) for file paths, while macOS and Linux use forward slashes (`/`). This difference can lead to compatibility issues in Node.js applications running across different operating systems. The `path` module in Node.js helps to handle these differences. 

Create a new file called `path.js`:

```javascript
const path = require('path');

console.log(__dirname);

// Get the base name - parent folder
const base = path.basename(__dirname);
console.log(base);

// Create path independent of platforms
const newPath = path.join(__dirname, 'public', 'abc', 'file.txt');
console.log(newPath);
```

### Fs Module

Create `fs.js`:

```javascript
const fs = require('fs');
const path = require('path');

// Create a file
fs.writeFile('file.txt', 'hello world', (err) => {
  if (err) throw err;
  console.log("Data written to file");
});

// Add content to the file
fs.appendFile('file.txt', 'some more text', (err) => {
  if (err) throw err;
  console.log("Data appended to file");
});

// Read the file
fs.readFile('file.txt', (err, data) => {
  if (err) throw err;
  console.log(data.toString());
});

// Create a directory
fs.mkdir('newDir', (err) => {
  if (err) throw err;
  console.log("Directory created");
});

// Create another directory
fs.mkdir(path.join(__dirname, 'newDir2'), (err) => {
  if (err) throw err;
  console.log("Directory created");
});

// Copy file from models folder to current directory
const copyFrom = path.join(__dirname, '../', 'models', 'bookingModel.js');
const destPath = path.join(__dirname, 'bookingModelCopy.js');

fs.copyFile(copyFrom, destPath, (err) => {
  if (err) throw err;
  console.log("File copied");
});
```
---
title: Basic Project
description: Agenda.
duration: 1260
card_type: cue_card
---
### Project

Create a project to scan the files in the downloads folder and categorize them as compressed (for rar, zip, 7zip files), documents (txt, xlsx, pdf, etc.), audio and video files. 

**Steps**:
1. Read the Downloads Directory: Use `fs.readdir` or `fs.readdirSync` to list all files in the downloads directory.
2. Categorize Files: Loop through the files, use the `path` module to extract file extensions, and categorize files based on their extension (`path.extname()` method).
3. Move Files: Create separate folders for each category and move files into the appropriate folder using `fs.rename` or `fs.copyFile`.
---
title: Streams
description: Agenda.
duration: 1260
card_type: cue_card
---
### Streams

In a Node.js application, how can you efficiently handle large files, like logs or media, without consuming excessive memory or blocking other operations? In Node.js, streams allow data to be processed in smaller chunks, one piece at a time, without needing to load the entire data into memory. This is like processing a large file bit by bit, instead of loading the whole file at once, which is memory-efficient and keeps the application responsive.

**Example**:
- Http request/response, crypto, and some methods on the `fs` module are internally stream-enabled.
- Streams make use of `zlib`.

#### 4 Types of Streams

1. **Readable**: Stream to read the data (`fs.createReadStream`), HTTP request object.
2. **Writable**: Stream for writing the data (`createWriteStream`).
3. **Duplex**: Sockets.
4. **Transform**: Change form from one to another. Output is computed from the input (e.g., zlib, crypto).

### EventEmitter Class

The `EventEmitter` class in Node.js is a cornerstone of its event-driven architecture. It provides a means for objects to emit custom events and to attach listeners to these events, facilitating asynchronous programming. Many core modules in Node.js, like `fs`, `http`, and `stream`, use `EventEmitter` for handling events like `data` (when data is available for reading) or `end` (when the end of the stream is reached).

```javascript
server.on('listening', () => {
  console.log('Server is listening on port 3000');
});
```

### Code for Reading Stream

In the `fs.js` file, comment other code and add below:

```javascript
const filePath = path.join(__dirname, 'big.file');
console.log(filePath);
const readableStream = fs.createReadStream(filePath);

readableStream.on('data', (chunk) => {
  console.log(`Received ${chunk.length} bytes of data.`);
});

readableStream.on('end', () => {
  console.log("Finished reading file");
});
```

Notice that there is no memory spike in the activity monitor.

### Code for Writing Stream

```javascript
const filePath = path.join(__dirname, 'big.file');
console.log(filePath);
const readableStream = fs.createReadStream(filePath);
const writableStream = fs.createWriteStream('copyOfBig.file');

readableStream.on('data', (chunk) => {
  console.log(`Received ${chunk.length} bytes of data.`);
  writableStream.write(chunk);
});

readableStream.on('end', () => {
  writableStream.end();
  console.log("Finished reading and writing the file");
});
```

### Pipe

The `pipe()` function is a method on Readable streams and is used to connect a readable stream to a writable stream. It automatically handles the data transfer from the readable stream to the writable stream. To simplify your code using the `pipe` method, you can replace the manual read and write operations with a single `pipe()` call.

```javascript
const filePath = path.join(__dirname, 'big.file');
console.log(filePath);
const readableStream = fs.createReadStream(filePath);
const writableStream = fs.createWriteStream('anotherCopyOfBig.file');

readableStream.pipe(writableStream);

readableStream.on('error', (err) => {
  console.log("Error while reading", err);
});
writableStream.on('error', (err) => {
  console.log("Error while writing", err);
});
```

### Fixing Problem Statement 1

How will we fix the first problem statement of a client requesting a large file? We create a read stream and then write the stream to response.

```javascript
server.on('request', (req, res) => {
  const src = fs.createReadStream('./big.file');
  src.pipe(res);
});
```

**Project 2 - Video Streaming Server**

Can you use the same concepts we have discussed and use them to create a video streaming server? Take a movie file, read it as a stream, and pipe the response. On the client side, try using HTML5 video. You have to take care of the ranges if the user wants a specific part to be streamed.

## Node.js Handbook

- [Node.js Handbook](https://flaviocopes.com/books-dist/node-handbook.pdf)