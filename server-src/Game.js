const boggle = require('pf-boggle');
const _ = require('lodash');

class Game {

  constructor(io, roomName) {
    this.timeRemaining = undefined;
    this.GAME_TIME = 20;
    this.io = io;
    this.roomName = roomName;
    this.socketUsernameMap = {};
  }

  start() {
    this.startTimer();
    
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

    this.io.to(this.roomName).emit('gameStarted', {
      board: boardModel
    });

    //calculate the solution right now while the game is going
    var solution = boggle.solve(board);
  }

  startTimer() {
    this.timeRemaining = this.GAME_TIME;
    var id = setInterval(() => {
      this.io.to(this.roomName).emit('timeRemainingUpdate', this.timeRemaining);
      if(this.timeRemaining === 0) {
        clearInterval(id);      
      } else {
        this.timeRemaining--;
      }
    }, 1000);
  }
}

module.exports = Game;