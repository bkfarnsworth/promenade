const _ = require('lodash');
const Game = require('./Game.js');


class CodeNames extends Game {

   start() {
      this.startTimer();
      this.emitToRoom('gameStarted', {
         letter: this.getRandomLetter(),
         list: this.getRandomList()
      });
   }

}

