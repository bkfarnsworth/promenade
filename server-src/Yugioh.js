const _ = require('lodash');
const Game = require('./Game.js');
const Cards = require('./YugiohCards.js');

class Yugioh extends Game {

   start() {
      this.io.to(this.roomCode).emit('gameStarted', {
         deck: this.getRandomDeck()
      });
   }

   //should be 40-60 cards
   getRandomDeck() {
      return _.sampleSize(Cards, 40);
   }

}

module.exports = Yugioh;