const path = require('path');
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

app.use(express.static(__dirname));

app.get('/', function(req, res) {
  res.sendFile(__dirname + '/docs/index.html');
});

io.on('connection', function(socket) {
  console.log(`${socket.id} connected`);

  socket.on('disconnect', function() {
    console.log('A user disconnected');
  });
});

server.listen(3000, () => {
  console.log('Listening on *: 3000');
});
