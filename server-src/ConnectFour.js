const _ = require('lodash');
const Game = require('./Game.js');

class ConnectFour extends Game {

   start() {
      this.emitToRoom('gameStarted', {
         startingPlayer: this.getRandomPlayer()
      });
   }

   getRandomPlayer() {
      return _.sample(this.socketWrappers).userName;
   }

}

module.exports = ConnectFour;