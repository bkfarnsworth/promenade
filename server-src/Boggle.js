const boggle = require('pf-boggle');
const _ = require('lodash');
const Game = require('./Game.js');


class Boggle extends Game {

   get easyWordsBoard() {
      //elephant & splinter
      return 'eleptnahspliretn'.toUpperCase().split('');
   }

   start() {

      this.startTimer();

      //clear out the playerResults if this game was used before
      //TODO: it might be better to new up a new Game and have it not be tied to a room as much as it is right now
      this.playerResults = undefined;
      
      var boardSize = 4;
      var board = this.debugMode ? this.easyWordsBoard : boggle.generate(boardSize);

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

      this.emitToRoom('gameStarted', {
         board: boardModel
      });

      //calculate the solution right now while the game is going (and filter to words greater than 2 words)
      var solution = boggle.solve(board);
      var solutionWithoutTwoLetterWords =  solution.filter(entry => entry.word.length > 2);
      var dedupedList = _.uniqBy(solutionWithoutTwoLetterWords, entry => entry.word);
      this.solution = dedupedList;
   }

   addResult(userName, words) {

      this.playerResults = this.playerResults || [];

      console.log();
      console.log('ADDING RESULT');
      console.log('userName: ', userName);
      console.log('words: ', words);
      console.log();

      let playerResult = {
         player: userName,
         scoredWords: [],
         sharedWords: [],
         invalidWords: [],
         score: 0
      };

      //uppercase all
      playerResult.scoredWords = words.map(w => w.toUpperCase())

      //dedup words
      playerResult.scoredWords = _.uniq(playerResult.scoredWords);

      //find invalid words
      playerResult.invalidWords = _.remove(playerResult.scoredWords, w => {
         let foundWord = this.solution.find(validEntry => validEntry.word === w);
         return !foundWord;
      });

      //add to results
      this.playerResults.push(playerResult);
   }

   calculateFinalResults() {
      let allWordsFound = _.flatten(this.playerResults.map(pr => pr.scoredWords));
      let wordCountMap = _.countBy(allWordsFound);
      let dupedWordsOnly = _.pickBy(wordCountMap, val => val > 1);
      let sharedWords = Object.keys(dupedWordsOnly);

      this.playerResults.forEach(pr => {
         pr.sharedWords = _.remove(pr.scoredWords, scoredWord => {
            return _.includes(sharedWords, scoredWord);
         });
      });

      //update scores for all players
      this.playerResults.forEach(pr => {
         pr.score = 0;
         pr.scoredWords.forEach(w => {
            pr.score += boggle.points(w);
         });
      });

      return this.playerResults;
   }

   submitResults(data, userName) {
      this.addResult(userName, data.words);
      this.getSockets(sockets => {
         if(this.playerResults.length === sockets.length) {
            let finalResults = this.calculateFinalResults();
            this.emitToRoom('finalResults', {
               finalResults,
               solution: this.solution
            })
         }
      });
   }

}

module.exports = Boggle;