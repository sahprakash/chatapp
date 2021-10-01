const express = require('express');
const socket = require('socket.io');

const app = express();
const port = process.env.PORT || 3000;
var server = app.listen(port, () => {
  console.log(`App is running on port ${port}`);
});

app.use(express.static('public'));

var io = socket(server);

io.on('connection', (socket) => {
  console.log("Hey got connected with socket.io", socket.id);

  socket.on('chat', (data) => {
    io.sockets.emit('chat', data);
  });
  socket.on('typing', (data) => {
    socket.broadcast.emit('typing', data);
  });
});
