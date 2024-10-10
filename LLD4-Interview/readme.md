# Agenda

Inbuilt modules
Third party 
Node js streams
child process


Node js vs Browser


Inbuilt modules

1. http, 
2. fs
3. path

Local Modules? 

Modules which we have created using module.exports.

Third party modules

These are built by community and available on npm, we can install by npm install <package name>


Node.js Streams

Child Process

allow node to run system commands, invoke scripts, or spawn new process. 


Node js Overview

1. Js on the server
2. Not a programming language, it's a runtime environment
3. Built on chrome V8 engine
   
Main feature of node js? 

1. Non-blocking, Event Driven architecture
2. Single Threaded

Browser and Node.js

Browser -> Fetch, DOM, handling user events, rendering client
Node.js -> provides a server-side runtime environment, inbuilt modules, 



Libuv? It's a cross-platform C library that node.js uses under the hood. 
It provides asynchronous I/O capabilities, timers, networking, file system.

Request flow? 

1. when a request arrives, it is handled by OS network layer. 
2. libuv picks up the request from the OS and queues it for processing by node.js
3. if the node.js is busy, libuv holds incoming requests in a queue. once the server is ready to process new requests, libuv forward them to nodejs



Part 2

Agenda : 
1. Solve the CPU extensive problem with the help child process. 
2. Event and Event Emitter
3. Http Server
4. Event loop and Architecture. 


Node : 
Non-Blocking Nature
Event Driven Architecture
Concurrency 


CPU Intensive Task-> 

Blocking Nature : main thread is busy doing complex calculations. but still event loop.