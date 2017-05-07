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

var timeRemaining;
const GAME_TIME = 20;
var startTimer = (roomName) => {
  timeRemaining = GAME_TIME;
  var id = setInterval(() => {
    io.to(roomName).emit('timeRemainingUpdate', timeRemaining);
    if(timeRemaining === 0) {
      clearInterval(id);      
    } else {
      timeRemaining--;
    }
  }, 1000);
}

io.on('connection', (socket) => {
  console.log('Client connected');

  socket.on('joinRoom', (roomName, userName, cb) => {

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

  socket.on('getRoomMembers', (roomName, cb) => {
    getUsernamesForRoom(roomName, (names) => {
      cb({
        roomMembers: names
      })
    });
  });

  socket.on('startGame', (roomName) => {
    //start timer
    startTimer(roomName);

    io.to(roomName).emit('gameStarted');
  });


  socket.on('guess', function(guess){
    console.log('message: ' + guess);
    io.emit('guess', guess);
  });

  socket.on('disconnect', () => console.log('Client disconnected'));
});


