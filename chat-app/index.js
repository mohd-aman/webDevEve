const express = require("express");
const app = express();
const http = require("http");
const path = require("path");
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get("/", (req, res) => {
  const htmlPath = path.join(__dirname, "index.html");
  res.sendFile(htmlPath);
});

io.on("connection", (socket) => {
  console.log("a user connected");

  socket.on('chat message', (msg) => {
    console.log('message: ' + msg);
    io.emit('chat message', msg); // broadcast it to all sockets
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

server.listen(3000, () => {
  console.log("listening on *:3000");
});
