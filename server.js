const path = require('path');
const express = require('express');
const app = express();
const socketIO = require('socket.io');
const PORT = process.env.PORT || 8080;

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/dist/index.html');
});

const server = app.listen(PORT, error => {
  error
  ? console.error(error)
  : console.info(`==> 🌎 Listening on port ${PORT}. Visit http://localhost:${PORT}/ in your browser.`)
});

const io = socketIO(server);

var socketUsernameMap = {};

var getUsernamesForRoom = (roomName, cb) => {
  io.in(roomName).clients((error, clients) => {
    cb(clients.map(c => socketUsernameMap[c]));
  });
}

io.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('joinRoom', (roomName, userName, cb) => {

    //get clients in room and check if this one is already there
    io.in(roomName).clients((error, clients) => {

      //check if already there, and return if so
      if(clients.indexOf(socket.id) !== -1) {
        cb();
        return;
      }

      //join the room
      socket.join(roomName);

      //add the username to the map
      socketUsernameMap[socket.id] = userName;

      //callback
      cb()

      //emit to all members that there is a new member
      getUsernamesForRoom(roomName, (names) => {
        io.to(roomName).emit('newRoomMember', {
          roomMembers: names
        })
      })
    });
  });

  socket.on('getRoomMembers', (roomName, cb) => {
    getUsernamesForRoom(roomName, (names) => {
      cb({
        roomMembers: names
      })
    });
  });

  socket.on('guess', function(guess){
    console.log('message: ' + guess);
    io.emit('guess', guess);
  });

  socket.on('disconnect', () => console.log('Client disconnected'));
});

setInterval(() => io.emit('time', new Date().toTimeString()), 1000);

