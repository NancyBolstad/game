const express = require('express');
const path = require('path');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.static(path.join(__dirname, 'docs')));

io.on('connection', function(socket) {
  console.log(`${socket.id} connected`);

  socket.on('disconnect', function() {
    console.log('A user disconnected');
  });
});

server.listen(3000, () => {
  console.log('Game server running at http://localhost:3000/');
});
