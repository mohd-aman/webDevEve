// io.on('connection', (socket) => {
//     // Join a specific room
//     socket.on('join_room', (room) => {
//         socket.join(room);
//         console.log(`User ${socket.id} joined room ${room}`);
//         socket.to(room).emit('server_message', `A new user has joined room ${room}`);
//     });

//     // Leave a specific room
//     socket.on('leave_room', (room) => {
//         socket.leave(room);
//         console.log(`User ${socket.id} left room ${room}`);
//         socket.to(room).emit('server_message', `User has left room ${room}`);
//     });

//     // Send message to a specific room
//     socket.on('room_message', (data) => {
//         const { room, message } = data;
//         socket.to(room).emit('server_message', message);
//     });
// });

// compress data 

// Server-side: Compressing messages
// socket.on('message', (data) => {
//     const compressedData = compress(data);
//     socket.emit('compressed_message', compressedData);
// });

// // Client-side: Decompressing messages
// socket.on('compressed_message', (data) => {
//     const decompressedData = decompress(data);
//     console.log('Received message:', decompressedData);
// });

// // Client-side: Automatically reconnect
// const socket = io({
//     reconnection: true,
//     reconnectionAttempts: 5,
//     reconnectionDelay: 3000,
// });

// Server-side: Managing user sessions
// io.on('connection', (socket) => {
//     const sessionID = socket.handshake.query.sessionID;
//     restoreSession(sessionID, (err, session) => {
//         if (session) {
//             console.log('Session restored:', session);
//         }
//     });
// });