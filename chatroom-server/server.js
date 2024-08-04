const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:3001", // React client origin
    methods: ["GET", "POST"]
  }
});

const users = new Set(['User1', 'User2', 'User3', 'User4']); // Dummy users

io.on('connection', (socket) => {
  console.log('a user connected');

  socket.on('join', (user) => {
    users.push(user);
    io.emit('users', users);
  });

  socket.on('leave', (user) => {
    users = users.filter(u => u !== user);
    io.emit('users', users);
  });

  socket.on('message', (message) => {
    io.emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log('user disconnected');
    // Optionally handle user disconnection
  });
});

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});

