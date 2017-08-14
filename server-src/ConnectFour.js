const _ = require('lodash');
const Game = require('./Game.js');

class ConnectFour extends Game {

   start() {
      this.emitToRoom('gameStarted', {
         // board: boardModel
      });
   }

}

module.exports = ConnectFour;