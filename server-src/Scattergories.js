const _ = require('lodash');
const Game = require('./Game.js');
const Lists = require('./ScattergoriesLists.js');

class Scattergories extends Game {

   start() {
      this.startTimer();
      this.emitToRoom('gameStarted', {
         letter: this.getRandomLetter(),
         list: this.getRandomList()
      });
   }

   getRandomLetter() {
      return "ABCDEFGHIJKLMNOPQRSTUVWXYZ".split('')[_.random(0, 25)];
   }

   getRandomList() {
      return Lists[_.random(0, Lists.length - 1)];
   }

}

module.exports = Scattergories;