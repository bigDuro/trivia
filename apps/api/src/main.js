const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const io = require('socket.io')(server);

// Maintain a list of connected users
const connectedUsers = [];

app.get('/', (req, res) => {
  res.send('Hello');
});

io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('registerUser', (userName) => {
    const existingUser = connectedUsers.find((user) => user.id === socket.id || user.userName == userName);

    if (existingUser) {
      // User with the provided userId is already registered
      socket.emit('registrationError', 'User already registered');
      console.log('Registration Error: User already registered');
    } else {
      // Register the user with the provided userName and userId
      connectedUsers.push({ userName, id: socket.id });
      console.log('User registered:', { userName, id: socket.id  });
      socket.emit('registrationSuccess', 'Registration successful');
      io.emit('userConnected', connectedUsers);
    }
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
    // Remove the user from the connectedUsers array based on socket.id
    const disconnectedUser = connectedUsers.find((user) => user.userId === socket.id);
    connectedUsers.splice(connectedUsers.indexOf(disconnectedUser), 1);
    io.emit('userDisconnected', connectedUsers);
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
