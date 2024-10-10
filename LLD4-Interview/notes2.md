
---
title: Agenda
description: Agenda.
duration: 1260
card_type: cue_card
---

## Agenda
1. Child Process
2. Event and Event Emitter
3. HTTP Server
4. Event Loop and Architecture

## Class Starts

### Recap: Asynchronous and CPU-Intensive Operations

**Asynchronous I/O Operations:**
- **Non-Blocking Nature:** Node.js handles I/O-bound operations like reading from a file, querying a database, or making an HTTP request asynchronously, allowing the event loop to continue executing other code or handling new requests.
- **Event-Driven Architecture:** When an I/O operation completes, Node.js uses events or callbacks to process the result, ensuring the server remains responsive.
- **Concurrency:** Node.js handles many concurrent operations efficiently without creating new threads for each I/O request, maintaining responsiveness even under high loads.

**CPU-Intensive Tasks:**
- **Blocking Nature:** CPU-bound tasks, such as complex calculations, are processed in the main thread, blocking the event loop and preventing Node.js from handling other tasks.
- **Impact on Performance:** When the main thread is busy with a CPU-heavy task, it can't process new requests or I/O operations, leading to slow response times and potential unresponsiveness.

**Highlighting the Difference:**
- **Responsiveness:** Node.js remains responsive with I/O-bound tasks but becomes occupied with CPU-bound tasks, reducing its ability to handle other requests.
- **Suitability:** Node.js excels in handling high I/O workloads but is less efficient with CPU-intensive tasks. Using child processes or worker threads can offload CPU-intensive tasks from the main thread.
---
title: Fibonacci Calculation
description: Agenda.
duration: 1260
card_type: cue_card
---
### Problem Statement 2

**Fibonacci Calculation:**
- **CPU-Intensive Task:** The `calculateFibonacci` function is a recursive function that blocks the event loop when dealing with large numbers, causing delays in processing other incoming requests.

### Child Processes in Node.js

Child processes allow you to perform operations in separate processes, useful for CPU-intensive tasks or lower-level system interactions.

**Types of Child Processes:**
1. **Exec:**
   - Runs a shell command and returns the output after the task is done.
   - Example:
     ```javascript
     const { exec } = require('child_process');

     exec('ls -lh', (error, stdout, stderr) => {
       if (error) {
         console.error(`exec error: ${error}`);
         return;
       }
       console.log(`stdout: ${stdout}`);
       console.error(`stderr: ${stderr}`);
     });
     ```

2. **ExecFile:**
   - Executes an executable file directly.
   - Example:
     ```javascript
     const { execFile } = require('child_process');
     const scriptPath = './script.sh'; // Use 'script.bat' for Windows
     const args = ['arg1', 'arg2'];

     execFile(scriptPath, args, (error, stdout, stderr) => {
       if (error) {
         console.error(`Execution error: ${error}`);
         return;
       }
       console.log(`stdout: ${stdout}`);
       console.error(`stderr: ${stderr}`);
     });
     ```

3. **Spawn:**
   - Launches a new process and streams the output and error streams.
   - Example:
     ```javascript
     const cp = require('child_process');

     cp.spawn("/Applications/Google Chrome.app/Contents/MacOS/Google Chrome", ["https://www.youtube.com/", "--incognito"]);
     ```

4. **Fork:**
   - Creates a new instance of the Node.js runtime to run a module in a new process, allowing inter-process communication (IPC).
   - Example:
     ```javascript
     // fiboWorker.js
     function calculateFibonacci(number) {
       if (number <= 1) {
         return number;
       }
       return calculateFibonacci(number - 1) + calculateFibonacci(number - 2);
     }

     process.on('message', ({ number }) => {
       const result = calculateFibonacci(number);
       process.send(result);
     });

     // main file
     app.get('/fib', (req, res) => {
       const { number, requestNumber } = req.query;
       if (!number || isNaN(number) || number <= 0) {
         return res.status(400).json({ error: 'Please provide a valid positive number.' });
       }
       const fiboRes = fork(path.join(__dirname, 'fiboWorker.js'));
       fiboRes.send({ number: parseInt(number, 10) });
       fiboRes.on('message', (answer) => {
         res.status(200).json({ status: "success", message: answer, requestNumber });
         fiboRes.kill();
       });
     });
     ```
---
title: Event Emitter
description: Agenda.
duration: 1260
card_type: cue_card
---
### Event Emitter Class

**EventEmitter in Node.js:**
- Allows objects to communicate by emitting and listening for events.
- Example:
  ```javascript
  const eventEmitter = require('events');
  const myEmitter = new eventEmitter();

  // Listeners
  myEmitter.on('myEvent', (...args) => {
    console.log("There is a new event!", args);
  });

  myEmitter.on('myEvent', (...args) => {
    console.log("another listener for the new event", args);
  });

  // Emit an event
  myEmitter.emit('myEvent');
  myEmitter.emit('myEvent', 1, 2);
  myEmitter.emit('myEvent', [1, 2, 3]);

  // Removing callbacks
  const secondCb = (...args) => {
    console.log("another listener for the new event", args);
  };

  myEmitter.on("myEvent", secondCb);
  myEmitter.off('myEvent', secondCb);
  myEmitter.emit("myEvent", [1, 2, 3]);
  ```

### HTTP Servers

**Creating a Basic Server:**
- Example:
  ```javascript
  const http = require('http');
  const server = http.createServer();

  server.listen(3000, () => {
    console.log('Server is running on port 3000');
  });

  // Adding a request listener
  server.on("request", (req, res) => {
    console.log("headers", req.headers, "url", req.url, "method", req.method);
    res.end("Hello World");
  });
  ```

**Handling Different HTTP Methods:**
- Example:
  ```javascript
  server.on("request", (req, res) => {
    console.log("headers", req.headers, "url", req.url, "method", req.method);
    if (req.method === "GET") {
      res.writeHead(200, { "Content-Type": "text/plain" });
      res.write("Hello World");
      res.end();
    } else if (req.method === "POST") {
      res.writeHead(200, { "Content-Type": "application/json" });
      res.end(JSON.stringify({ name: "John" }));
    }
  });
  ```
---
title: Node Architecture
description: Agenda.
duration: 1260
card_type: cue_card
---
### Node Architecture

**Key Components:**
1. **V8 Engine:** Compiles JavaScript into machine code.
2. **Libuv:** Provides event-driven, asynchronous I/O capabilities.
3. **Node Bindings:** Interface between JavaScript and Node.js's C/C++ core functionalities.
4. **Node Standard Library:** Modules like `fs`, `os`, `http`.
5. **OpenSSL:** For secure communication over networks.
6. **c-ares:** For DNS requests.
7. **http-parser:** For parsing HTTP messages.

**Order of Execution:**
1. Application Code
2. V8 Engine
3. Node Bindings
4. Libuv & Other C/C++ Modules
5. Callback to V8
6. Application Code

### Event Loop

**Flow:**
1. **Initialization:** Node.js process starts.
2. **Phases:** Event loop runs through several phases.
3. **Poll Phase:** Executes I/O callbacks and awaits new events.
4. **Check Phase:** Executes `setImmediate()` callbacks.
5. **Close Callbacks Phase:** Executes close callbacks.
6. **Timers Phase:** Executes `setTimeout()` or `setInterval()` callbacks.
7. **Process Next Tick:** Processes `process.nextTick()` callbacks.
8. **Microtasks:** Processes resolved Promise callbacks.
9. **Repeat:** Continues until no more callbacks to process.

**Example:**
```javascript
console.log('Start');

process.nextTick(() => {
  console.log('Next Tick');
});

setImmediate(() => {
  console.log('Set Immediate');
});

console.log('End');
```

The `process.nextTick` callback runs right after the current script ('Start' and 'End' log statements) finishes, even before `setImmediate`, which waits until the next cycle of the event loop.


### Summary
- **Node.js Event Loop:** Handles non-blocking I/O operations by offloading tasks to the system kernel when possible.
- **Event Loop Phases:**
  - **Timers:** Executes `setTimeout` and `setInterval` callbacks.
  - **Pending Callbacks:** Executes I/O callbacks deferred to the next loop iteration.
  - **Idle, Prepare:** Only used internally.
  - **Poll:** Retrieves new I/O events; executes I/O related callbacks.
  - **Check:** Executes `setImmediate` callbacks.
  - **Close Callbacks:** Executes close events like `socket.on('close')`.
  - **Microtasks:** Processes `process.nextTick` and resolved Promise callbacks after each phase.

**Example: Event Loop Code**
```javascript
console.log('Start');

process.nextTick(() => {
  console.log('Next Tick');
});

setImmediate(() => {
  console.log('Set Immediate');
});

console.log('End');
```
Output:
```
Start
End
Next Tick
Set Immediate
```

## Additional Details on Event Emitters
**Visualization of Event Emitter Class Structure**
1. **Constructor:** Holds the emitter object and an events object.
2. **On Method:** Accepts event name and listener.
3. **Emit Method:** Calls all listeners for the event.
---
title: Custom Event Emitter
description: 
duration: 1260
card_type: cue_card
---
**Custom Event Emitter Implementation**
```javascript
class MyEventEmitter {
  constructor() {
    this.events = {};
  }

  on(event, listener) {
    if (!this.events[event]) {
      this.events[event] = [];
    }
    this.events[event].push(listener);
  }

  emit(event, ...args) {
    if (this.events[event]) {
      this.events[event].forEach(listener => listener(...args));
    }
  }
}

// Example usage
const myEmitter = new MyEventEmitter();
myEmitter.on('myEvent', (...args) => console.log("There is a new event!", args));
myEmitter.emit('myEvent', 1, 2, 3);
```
---
title: Extra Resources
description: 
duration: 1260
card_type: cue_card
---
## References
- [Node.js Child Processes: Everything You Need to Know](https://www.freecodecamp.org/news/node-js-child-processes-everything-you-need-to-know-e69498fe970a/)
- [Event Loop Timers and `process.nextTick`](https://nodejs.org/en/docs/guides/event-loop-timers-and-nexttick/)
- [libuv](https://libuv.org/)
- [MIME Types](https://developer.mozilla.org/en-US/docs/Web/HTTP/Basics_of_HTTP/MIME_types)
- [Node.js: Don't Block the Event Loop](https://nodejs.org/en/guides/dont-block-the-event-loop/)

This document covers the discussed topics and examples for handling child processes, event emitters, HTTP servers, and the Node.js event loop architecture. Feel free to add more code examples and explanations based on your class needs.