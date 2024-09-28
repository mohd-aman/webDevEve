---
title: Websockets
description: 
duration: 
card_type: cue_card
---


# Class 13 - Websockets

## Agenda

### Http and Realtime Connections
- Websockets

#### Features
- Pros
- Cons
- Chat app example

---
title: How websockets work
description: 
duration: 
card_type: cue_card
---

### Client Server Communication Flow
1. When a client makes a request to a server over the web (e.g., entering a URL in a browser), it first establishes a TCP connection with the server.
2. Three-way handshake happens. This involves the exchange of SYN (synchronize) and ACK (acknowledgment) packets.
3. Once the TCP connection is established, the client sends an HTTP request through this connection.
4. The server receives the HTTP request, processes it, and sends back an HTTP response.
5. The response is received by the client, and the information (like a webpage) is rendered for the user.
6. The TCP connection can be closed or kept open for further requests, depending on the HTTP headers (like Connection: keep-alive).

### Design Choices of the Communication System in Place
- By design, HTTP was designed to be stateless.
- This communication was designed to be a client-initiated protocol.
- Client initiates a request to which server responds back.
- We tried to remove certain inefficiencies like creating a new TCP connection for every request.
- In HTTP/1.1, persistent connections were introduced to overcome this inefficiency. With persistent connections, also known as HTTP keep-alive, a single TCP connection can be reused for multiple HTTP requests and responses between a client and server.
- HTTP/2, standardized in 2015, built upon the concept of persistent connections by introducing multiplexing. This allows multiple requests and responses to be simultaneously active on the same connection.
- Nevertheless, they still remain client-initiated model.

### Limitations of HTTP for Real-Time Communication
- One-Way Communication: The server cannot initiate communication with the client, which limits real-time interactions.
- Overhead of HTTP Headers: Each HTTP request and response carries a significant amount of header data. This overhead is inefficient, especially for applications that need to send frequent, small messages, like real-time chat messages or live price updates in trading applications.
- No Persistent Connections: It does not allow for continuous, full-duplex communication where data can flow in both directions simultaneously.
- Full-duplex means that data can flow in both directions simultaneously, which is crucial for real-time applications.
- Latency Issues: HTTP's request-response nature can lead to latency issues in real-time applications. "I need market updates for live tracker. I need to send requests frequently to get the updates."

### Were There No Chat Applications Prior to Websockets?
- Chat applications and other real-time kinds of applications were indeed created and widely used before the introduction of WebSockets. However, the techniques used for these earlier chat applications were different and had certain limitations compared to the real-time capabilities provided by WebSockets.
- Polling: In this approach, the client (typically a web browser) would regularly send HTTP requests to the server to check for new messages. This was a straightforward approach but inefficient, as it involved sending requests at regular intervals regardless of whether there were new messages, leading to unnecessary network traffic and server load.
- Long Polling: An improvement over traditional polling, long polling involves the client sending a request to the server, which then keeps the request open until new data (like a chat message) becomes available. Once the data is sent to the client, the connection closes, and the client immediately opens a new connection. This method reduces the amount of unnecessary HTTP requests but still has higher latency compared to WebSockets.

### Websockets
- Think of traditional HTTP communication as mailing letters (where you send a letter, wait for a response, and can't communicate until you receive a reply), whereas WebSockets is like a telephone call (where once you're connected, both parties can speak and listen at any time, in real-time).
- Persistent Connections: Emphasize that unlike HTTP, WebSocket creates a persistent connection between each client and the server. This means that once a client (C1, C2, C3) establishes a connection to the server, it remains open for two-way communication until explicitly closed by either client or a server.
- WebSocket connection as a "channel" or "pipeline" that directly links each client to the server. This channel is unique and private to the client-server pair.
- Full-Duplex Communication: Illustrate that these channels are full-duplex, meaning that both the server and the client can send messages to each other independently and simultaneously without waiting for a request-response sequence.
- Real-time Interaction: Highlight that this setup allows for real-time interaction. As soon as the server has new data (like a message or update), it can immediately send it to the connected client(s), and vice versa.
- WebSocket starts as an HTTP connection and then "upgrades" to a WebSocket connection through a handshake process. This upgrade is initiated with an HTTP request including a header (Upgrade

: websocket) indicating the desire to establish a WebSocket connection.
- Another advantage that comes out is the header data in WebSocket communication is minimal because, unlike HTTP, it does not require the continuous transmission of cookies, user credentials, or other client-specific headers with each message, resulting in smaller packet sizes.

### Demo Websockets
- Search for a live crypto market and go to [Livecoinwatch](https://www.livecoinwatch.com/).
- Go to network tab and select ws (WebSockets) and reload.

### Important Points to Discuss
- When you select the 'WS' (WebSocket) filter in the Network tab of your browser's developer tools and see a request with a status code of 101, you're looking at the WebSocket handshake.
- Status Code 101: This indicates 'Switching Protocols'. When you see this, it means the server understood the client's request to open a WebSocket connection and is agreeing to switch protocols from HTTP to WebSocket.
- Request URL: The URL starting with wss:// shows that the WebSocket connection is secure (similar to https:// for secure HTTP connections). The wss protocol indicates that data sent over the WebSocket connection is encrypted, providing the same level of security as HTTPS.
- Response Headers: headers like Upgrade: websocket and Connection: Upgrade,
- Messages Tab: After the handshake, you can switch to the 'Messages' tab within the WebSocket connection in the developer tools. This tab will show you the actual data frames being sent and received through the WebSocket. This is where you can see the real-time communication aspect of WebSockets.
- Go to the timestamp column to see the real-time updates.

### CONS
- Resource Utilization for Idle Connections: WebSocket connections, even when idle, continue to consume resources on the server, which can be inefficient compared to stateless HTTP connections that are closed after a transaction.
- WebSocket does not have a built-in mechanism for back-pressure, which is the ability to handle situations where the server is sending data faster than the client can process it.
- Each open WebSocket connection consumes resources on the client side, including memory and network ports. The client device's capabilities (such as CPU, RAM, and network bandwidth) can thus limit the number of connections that can be practically managed.
- The persistent nature of the connection can pose additional security challenges, potential for the server to be exposed to Denial of Service (DoS) attacks.
- Smaller packet size can lead to fragmentation of large messages.

---
title: Websocket Implementation with Socket.io
description: 
duration: 
card_type: cue_card
---

### Websockets: Implementation
- [MDN docs - The WebSocket API](https://developer.mozilla.org/en-US/docs/Web/API/WebSockets_API) is an advanced technology that makes it possible to open a two-way interactive communication session between the user's browser and a server. With this API, you can send messages to a server and receive event-driven responses without having to poll the server for a reply.
- Come to [Socket.IO](https://socket.io/) - a JavaScript library that enables real-time, bidirectional, and event-based communication between web clients (like browsers) and servers. It's commonly used to build interactive and real-time applications, such as chat applications, live news feeds, and collaborative editing tools. 

#### Set up a basic Socket.IO server
```bash
mkdir myapp
cd myapp
npm init -y
npm install express socket.io
```

##### `websockets.js`
```javascript
const express = require("express");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
const server = http.createServer(app);
const io = new Server(server);

io.on('connection', (socket) => {
    console.log('a user connected');
});

app.get('/', (req, res) => {
    res.send("hello world");
});

server.listen(3000, () => console.log("listening at 3000"));
```

##### `index.html` under `public` directory
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Websockets</title>
</head>
<body>
    <h1>Websockets</h1>
    <script src="/socket.io/socket.io.js"></script>
    <script>
        const socket = io();
    </script>
</body>
</html>
```

- Serve static files from `public` directory in your Express app.
- Observe WebSocket communication in action by opening `localhost:3000` in your browser and inspecting the network traffic.
```
```markdown
#### Continuing the Setup of Socket.IO Server

##### Adding real-time communication features

```javascript
io.on('connection', (socket) => {
    console.log('a user connected:', socket.id);

    // Send a message from the server to the client
    socket.emit("message", "Welcome to the WebSocket server!");

    // Handle incoming messages from clients
    socket.on("client_message", (msg) => {
        console.log("Message from client:", msg);
        // Broadcast the message to all connected clients
        io.emit("server_message", msg);
    });

    // Handle disconnection
    socket.on('disconnect', () => {
        console.log('user disconnected', socket.id);
    });
});
```

---
title: Client side Experience
description: 
duration: 
card_type: cue_card
---

##### Enhancing the Client-Side Experience

###### `index.html`
```html
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Websockets Demo</title>
    <style>
        body { font-family: Arial, sans-serif; margin: 40px; }
        #messages { list-style-type: none; padding: 0; }
        #messages li { padding: 8px; background: #f3f3f3; border: 1px solid #ddd; margin-top: 5px; }
    </style>
</head>
<body>
    <h1>Websockets Demo</h1>
    <ul id="messages"></ul>
    <form id="form" action="">
        <input id="input" autocomplete="off"><button>Send</button>
    </form>

    <script src="/socket.io/socket.io.js"></script>
    <script>
        const socket = io();

        // Form submit handler
        const form = document.getElementById('form');
        const input = document.getElementById('input');

        form.addEventListener('submit', function(e) {
            e.preventDefault();
            if (input.value) {
                socket.emit('client_message', input.value);
                input.value = '';
            }
        });

        // Listen for messages from the server
        socket.on('server_message', function(msg) {
            var item = document.createElement('li');
            item.textContent = msg;
            document.getElementById('messages').appendChild(item);
            window.scrollTo(0, document.body.scrollHeight);
        });
    </script>
</body>
</html>
```

##### Summary of Client-Side Operations
- The `index.html` file sets up a simple user interface for sending messages via a form input and displays incoming messages in a list.
- Messages typed into the form are sent to the server using the `socket.emit` function, and messages received from the server are displayed in the `ul` list on the webpage.
- This creates a basic chat application where messages can be sent and received in real-time between connected clients.

---
title: Web Socket Rooms
description: 
duration: 
card_type: cue_card
---

#### WebSocket Rooms: Enhancing the Functionality

WebSocket rooms allow you to manage groups of clients, enabling more controlled and targeted messaging. Here's how to implement rooms in Socket.IO:

```javascript
io.on('connection', (socket) => {
    // Join a specific room
    socket.on('join_room', (room) => {
        socket.join(room);
        console.log(`User ${socket.id} joined room ${room}`);
        socket.to(room).emit('server_message', `A new user has joined room ${room}`);
    });

    // Leave a specific room
    socket.on('leave_room', (room) => {
        socket.leave(room);
        console.log(`User ${socket.id} left room ${room}`);
        socket.to(room).emit('server_message', `User has left room ${room}`);
    });

    // Send message to a specific room
    socket.on('room_message', (data) => {
        const { room, message } = data;
        socket.to(room).emit('server_message', message);
    });
});
```

### Conclusion

This WebSocket and Socket.IO setup demonstrates the basic capabilities for real-time communication across web applications. The server and client scripts together enable a dynamic chat experience, highlighting the power of WebSockets for real-time interaction and the additional capabilities provided by Socket.IO rooms for targeted and group communications.
```

```markdown
### Advanced WebSocket Features and Best Practices

#### Handling More Complex Scenarios

##### Authentication and Security
- Implementing authentication in WebSocket connections is crucial for ensuring that only authorized users can communicate via your server. Typically, this involves validating tokens or session IDs at the time of the WebSocket connection establishment.

##### Example: WebSocket Authentication
```javascript
io.use((socket, next) => {
    const token = socket.handshake.query.token;
    authenticateToken(token, (err, user) => {
        if (err) return next(new Error('Authentication error'));
        socket.user = user;
        next();
    });
});
```

##### Scalability
- As your application grows, managing a single WebSocket server might not be sufficient. Using load balancers and multiple WebSocket servers can help distribute the load effectively.

##### Example: Scaling WebSockets
- Implement WebSocket servers in multiple instances and use a load balancer that supports WebSocket to distribute connections.
- Use shared storage or messaging systems like Redis to share states between different server instances.

#### Performance Optimization
- WebSocket connections can be resource-intensive. Optimizing the number of connections and the data transferred is key to maintaining high performance.

##### Data Compression
- Implementing data compression techniques can significantly reduce the amount of data transferred over the network.

```javascript
// Server-side: Compressing messages
socket.on('message', (data) => {
    const compressedData = compress(data);
    socket.emit('compressed_message', compressedData);
});

// Client-side: Decompressing messages
socket.on('compressed_message', (data) => {
    const decompressedData = decompress(data);
    console.log('Received message:', decompressedData);
});
```

#### Enhancing User Experience

##### Connection Stability and Reconnections
- Handling disconnections and allowing reconnections without losing data is essential for a good user experience.

```javascript
// Client-side: Automatically reconnect
const socket = io({
    reconnection: true,
    reconnectionAttempts: 5,
    reconnectionDelay: 3000,
});

// Server-side: Managing user sessions
io.on('connection', (socket) => {
    const sessionID = socket.handshake.query.sessionID;
    restoreSession(sessionID, (err, session) => {
        if (session) {
            console.log('Session restored:', session);
        }
    });
});
```

##### Real-Time Analytics
- Incorporating real-time analytics can provide insights into the behavior of users and the performance of the system.

```javascript
// Server-side: Tracking message counts
let messageCount = 0;

io.on('message', () => {
    messageCount++;
    console.log('Total messages:', messageCount);
});
```

### Monitoring and Maintenance

#### Logging and Error Handling
- Proper logging and error handling are essential for debugging and maintaining a WebSocket server.

```javascript
io.on('connection', (socket) => {
    socket.on('error', (err) => {
        console.error('WebSocket error:', err);
    });
});
```

#### Regular Updates and Security Patches
- Keeping your WebSocket server and libraries up to date is crucial for security and performance.

### Conclusion

Implementing WebSockets with Socket.IO provides a robust framework for building real-time web applications. By leveraging advanced features and following best practices, developers can create scalable, secure, and highly interactive applications. This setup not only facilitates immediate communication but also enhances user engagement and satisfaction by providing a seamless real-time experience.
```