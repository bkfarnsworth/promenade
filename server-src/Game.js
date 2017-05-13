const boggle = require('pf-boggle');
const _ = require('lodash');

const debugMode = false;
const GAME_TIME = debugMode ? 20 : 180;

class Game {

  constructor(io, roomCode) {
    this.timeRemaining = undefined;
    this.io = io;
    this.roomCode = roomCode;
    this.socketUsernameMap = {};
  }

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
    var board = debugMode ? this.easyWordsBoard : boggle.generate(boardSize);

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

    this.io.to(this.roomCode).emit('gameStarted', {
      board: boardModel
    });

    //calculate the solution right now while the game is going
    this.solution = boggle.solve(board);
  }

  startTimer() {
    this.timeRemaining = GAME_TIME;
    var id = setInterval(() => {
      this.io.to(this.roomCode).emit('timeRemainingUpdate', this.timeRemaining);
      if(this.timeRemaining === 0) {
        clearInterval(id);      
      } else {
        this.timeRemaining--;
      }
    }, 1000);
  }

  addResult(userName, words) {

    this.playerResults = this.playerResults || [];

    console.log();
    console.log('ADDING RESULT');
    console.log('userName: ', userName);
    console.log('words: ', words);
    console.log('this.playerResults: ', this.playerResults);

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
    playerResult.scoredWords = playerResult.scoredWords.filter(w => {
      return this.solution.find(validEntry => validEntry.word === w);
    });

    //go through other players and cancel out words
    this.playerResults.forEach(otherPlayerResult => {
      
      let sharedWords = _.intersection(playerResult.scoredWords, otherPlayerResult.scoredWords);

      //adjust list of the player we are adding right now
      this.removeElements(playerResult.scoredWords, sharedWords);
      playerResult.sharedWords.push(...sharedWords);
      playerResult.sharedWords = _.uniq(playerResult.sharedWords);

      //adjust list of the player we were checking against
      this.removeElements(otherPlayerResult.scoredWords, sharedWords);
      otherPlayerResult.sharedWords.push(...sharedWords);
      otherPlayerResult.sharedWords = _.uniq(otherPlayerResult.sharedWords);
    });

    //add to results
    this.playerResults.push(playerResult);

    //update scores for all players
    this.playerResults.forEach(pr => {
      pr.score = 0;
      pr.scoredWords.forEach(w => {
        pr.score += boggle.points(w);
      });
    });
  }

  removeElements(arr, elsToRemove) {
    elsToRemove.forEach(elToRemove => {
      _.remove(arr, el => el === elToRemove);
    });
  }

  getFinalResults() {
    return this.playerResults;
  }

}

module.exports = Game;