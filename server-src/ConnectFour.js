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

   playerHasWon(player, board) {

      //for every piece, see if it has a piece next to it, and look for paths

      let cells = getAllCellsInBoard(board);
      cells = cells.filter(c => c.player === player);




      //first cell - just has to be of the right color
      //second cell - look at all adjacent cells and find one of the right color
      //third cell - look at the cell in the third spot
         //if the first and the second share a x, then look at the coords (sharedX, secondCellY + 1)
         //if the first and the second share a y, then look at the coords (secondCellX + 1, sharedY)
         //if the first and the second don't share coords
            //must be diagonal - if 2nd cell x is > than 1st cell x, use 2nd cell + 1 for x
            //same for y
            //if the opposite, use 2nd cell - 1 for x and y
      //for the fourth cell, it's exactly the same, just + 2


      //how does this differ for 4 player? I think it is almost the same - a cell can just have more than one color.  So as long as we are checking if a cell has a color, and not is a color, then it should just work.



      let firstCell  = this.findFirstCell(board);
      let secondCell = this.findSecondCell(firstCell, board);
      let thirdCell  = this.findThirdCell(firstCell, secondCell, board);
      let fourthCell = this.findFourthCell(firstCell, secondCell, thirdCell, board);

      if(fourthCell) {
         return true;
      }





      cells.forEach(c => {
         let adjacentCells = getAdjacenetCells(board, c);
         adjacentCells.forEach(ac => {
            if(ac.player === player) {
               // check the next hard coded values for discs in a row
               let firstCoords = c.coords;
               let secondCoords = ac.coords;

               // xxxxxx
               // xxxxxx
               // xxxxxx
               // xxxxxx
               // ooxxxx

               //0,0 and 1,0
               //0,0 and 1,1
               //1,1 and 1,0
               //1,0 and 2,0


               //how do I do this as a human?


               //find the direction we are going
               let thirdX = secondX - firstX
            }
            // 
         });
      })




      return false;
   }

   finishedTurn(board, player) {

      //check for winner here
      if(this.playerHasWon(player, board)){
         //emitwinner
      } else {
         this.emitToRoom('newTurn', {
            board: board,
            activePlayer: this.getNextPlayer(player)
         });
      }
   }

}

module.exports = ConnectFour;