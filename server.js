const path = require('path');
const express = require('express');
const app = express();
const socketIO = require('socket.io');
const PORT = process.env.PORT || 8080;
const boggle = require('pf-boggle');
const _ = require('lodash');


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
    
    var boardSize = 4;
    var board = boggle.generate(boardSize);

    //make the board to have rows and cells
    var boardModel = {
      rows: []
    }

    var chunked = _.chunk(board, boardSize);
    chunked.forEach(chunk => {
      boardModel.rows.push({
        id: _.uniqueId(),
        cells: chunk.map(letter => {
          return {
            id: _.uniqueId(),
            text: letter
          }
        })
      })
    });

    io.to(roomName).emit('gameStarted', {
      board: boardModel
    });

    //calculate the solution right now while the game is going
    var solution = boggle.solve(board);

  });

  // socket.on('reportWords', (words) => {

  //   //have a global game var

  //   // add the player and words to game object

  //   game.addPlayerResults(player, words);
  //     //this will go through any player already reported, and cancel out words that are shared between players
  //     //modify there scores

  //   if(game.entries === numberOfPeopleInRoom) {
        
  //     //emit to the room the final scores

  //     roomEtc.emit('gameResults', 
  //       [ 
  //         {
  //           player: fdasfds,
  //           words: [],
  //           score: 123
  //         }
  //       ]
  //     );
  //   }
  //   //get all the players and their scores
  // });


  socket.on('guess', function(guess){
    console.log('message: ' + guess);
    io.emit('guess', guess);
  });

  socket.on('disconnect', () => console.log('Client disconnected'));
});


