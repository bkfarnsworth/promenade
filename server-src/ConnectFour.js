const _ = require('lodash');
const Game = require('./Game.js');

class ConnectFour extends Game {

   start() {
      this.io.to(this.roomCode).emit('gameStarted', {
         // deck: this.getRandomDeck()
      });
   }

}

module.exports = ConnectFour;