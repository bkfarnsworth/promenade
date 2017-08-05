const _ = require('lodash');
const Game = require('./Game.js');

class Scattergories extends Game {

   start() {
      this.startTimer();
      this.io.to(this.roomCode).emit('gameStarted', {
         letter: this.getRandomLetter()
      });
   }

   getRandomLetter() {
      return "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('')[_.random(0, 25)];
   }

}

module.exports = Scattergories;