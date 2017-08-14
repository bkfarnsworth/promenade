const _ = require('lodash');
const Game = require('./Game.js');

class ConnectFour extends Game {

   start() {
      this.emitToRoom('gameStarted', {
         firstPlayer: this.getRandomPlayer()
      });
   }

   getRandomPlayer() {
      return _.sample(this.socketWrappers).userName;
   }

   getUsernames() {
      return this.socketWrappers.map(s => s.userName);
   }

   getNextPlayer(currentPlayer) {
      let usernames = this.getUsernames();
      let currentIndex = usernames.indexOf(currentPlayer);

      if(currentIndex + 1 === usernames.length) {
         //means we hit the end, so wrap
         return usernames[0];
      } else {
         return usernames[currentIndex + 1];
      }
   }

   finishedTurn(board, player) {
      this.emitToRoom('newTurn', {
         board: board,
         activePlayer: this.getNextPlayer(player)
      });
   }

}

module.exports = ConnectFour;