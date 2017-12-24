const _ = require('lodash');
const Game = require('./Game.js');
const Moniker = require('moniker');


class CodeNames extends Game {

   start() {
      this.startTimer();
      this.emitToRoom('gameStarted', {
         board: this.generateBoard()
      });
   }

   generateBoard() {

      //decides random if red or blue goes first
      let firstTeam = _.random(0, 1) ? 'red' : 'blue';
      let secondTeam = firstTeam === 'red' ? 'blue' : 'red';

      //gets the 25 nouns
      let nounDictionary = Moniker.generator([Moniker.noun]);
      let nouns = _.fill(new Array(25), '');
      nouns = nouns.map(n => nounDictionary.choose());

      let teamSpots = [
         ..._.fill(Array(8), 'red'),
         ..._.fill(Array(8), 'blue'),
         ..._.fill(Array(7), 'neutral'),
         firstTeam === 'red' ? 'red' : 'blue',
         'assassin',
      ]

      //now shuffle them
      teamSpots = _.shuffle(teamSpots);

      //now create combined array with nouns and team spots
      let cells = nouns.map((noun, index) => {
         return {
            word: noun,
            team: teamSpots[index],
            discovered: false
         }
      }) 

      //create rows
      let rows = _.chunk(cells, 5);

      //create board now
      let board = {
         rows: rows.map(r => {return {cells: r}})
      }

      return board;
   }

}

module.exports = CodeNames;
