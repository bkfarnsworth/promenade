import React from 'react';
import PropTypes from 'prop-types';
import AppConfig from './../AppConfig';
import SocketMixin from './SocketMixin';
import DebugHelper from './../DebugHelper';
import './Boggle.css';
import _ from 'lodash';
import $ from 'jQuery';

const debugOpts = {
   board: true
}


const BoggleCell = (props) => {
   let cell = props.cell;
   let style = { left: (props.cellNum * 25) + '%' }

   if(props.isSelected) {
      // style.backgroundColor = 'blue';
   }

   return (
      <div className="boggle-tile" style={style} data-cell-id={cell.id} data-cell-num={props.cellNum} data-row-num={props.rowNum} data-letter={cell.text}>
         <div className="boggle-hit-zone">
            <div className="boggle-letter">
               {cell.text}
            </div>
         </div>
      </div>
   );
}

const BoggleRow = (props) => {
   let row = props.row;
   let style = {top: (props.rowNum * 25) + '%'}
   return (
      <div className="boggle-row" style={style}>
         {row.cells.map((cell, cellNum) => {
            var isSelected = Boolean(props.selectedCells.find(c => c.cellId === cell.id));
            return <BoggleCell key={cell.id} cell={cell} cellNum={cellNum} rowNum={props.rowNum} isSelected={isSelected}/>
         })}
      </div>
   )
}

export const BoggleBoard = (props) => {
   let boggle = props.boggle;
   return (
      <div className="boggle-board" onTouchMove={props.onMobileTouchMove} onTouchEnd={props.onMobileTouchEnd}>
         {boggle.rows.map((row, index) => {
            return <BoggleRow key={row.id} row={row} rowNum={index} selectedCells={props.selectedCells}/>
         })}
      </div>
   );
};

const Guesses = (props) => {
   return (
      <div>
         <b>Words:</b>
         <div className="boggle-guess-list">
            {props.guesses.map(g => {
               return <div className="boggle-guess" key={g}>{g}</div>;
            })}
         </div>
      </div>
   )
}

class Boggle extends React.Component  {

   constructor(props) {
      super(props)
      Object.assign(this, SocketMixin);
      this.selectedCells = [];
      this.state = {
         input: '',
         guesses: [
            'cat', 'rat', 'nat',
            'aat', 'bat', 'dat',
            'eat', 'fat', 'gat',
            'hat', 'zat', 'yat',
         ]
      }
   }

   get board() {
      if(debugOpts.board) {
         return DebugHelper.board1;
      } else {
         return _.get(this, 'props.location.state.board');
      }
   }

   get playerType() {
      return _.get(this, 'props.location.state.playerType');
   }

   get roomCode() {
      return _.get(this, 'props.location.state.roomCode');
   }

   get userName() {
      return _.get(this, 'props.location.state.userName');
   }

   componentDidMount() {
      this.onSocketEvent('timeRemainingUpdate', (timeRemaining) => {
         this.setState({
            timeRemaining
         });

         if(timeRemaining === 0) {
            this.socket.emit('submitResults', {
               words: this.state.guesses
            });
         }
      });

      this.onSocketEvent('finalResults', (data) => {
         console.log('data: ', data);
         this.props.history.push({
            pathname: '/results',
            state: {
               finalResults: data.finalResults,
               solution: data.solution,
               playerType: this.playerType,
               userName: this.userName,
               roomCode: this.roomCode,
               board: this.board
            }
         });
      });
   }

   componentWillUnmount() {
      this.callOffFuncs();
   }

   addGuessToState(guess) {
      if(this.guessIsValid(guess)) {
         var guesses = this.state.guesses.slice();
         guesses.push(guess);
         this.setState({
            guesses: guesses,
         });
      }
   }  


   //TODO: Next steps:
   // Figure out why it's actually not working - slow? logic issue?
   // should I use jQuery?
   // I could change it from being on drag to just being on tap - that would probably make it a lot simpler
   // make the hitzones smaller for each tile


   //last = 2,2
   // 1,1 2,1 3,1
   // 1,2 xxx 3,2
   // 1,3 2,3 3,3
   //both nums have to be within 1 of the last selection
   targetIsAdjacentToLastSelection(cellNum, rowNum) {

      //get coords of last selection
      var lastSelection = _.last(this.selectedCells);
      if(!lastSelection) { return true; } //if nothing has been selected, it's always valid
      var lastCellNum = lastSelection.cellNum;
      var lastRowNum = lastSelection.rowNum;

      //calc diff
      var cellDiff = lastCellNum - cellNum;
      var rowDiff = lastRowNum - rowNum;

      //return true if both numbers are within 1
      return Math.abs(cellDiff) <= 1 && Math.abs(rowDiff) <= 1;
   }

   //I should debounce right?   
   onMobileTouchMove(e){

      //get the target the user is touching
      var myLocation = e.changedTouches[0];
      var realTarget = document.elementFromPoint(myLocation.clientX, myLocation.clientY);

      //check if they are over a hitzone
      var $hitZone = $(realTarget).closest('.boggle-hit-zone');
      if(!$hitZone.length) { return; }

      //get the tile info of the tile they are over
      var $boggleTile = $(realTarget).closest('.boggle-tile');
      var cellId = $boggleTile.attr('data-cell-id');
      var cellNum = $boggleTile.attr('data-cell-num');
      var rowNum = $boggleTile.attr('data-row-num');
      var letter = $boggleTile.attr('data-letter');
      var cellAlreadyUsed = Boolean(_.find(this.selectedCells, cell => cell.cellId === cellId));
      var selectionIsAdjacent = this.targetIsAdjacentToLastSelection(cellNum, rowNum);
      var isValidSelection = cellId && !cellAlreadyUsed && selectionIsAdjacent;

      if(isValidSelection) {
         $boggleTile.css('backgroundColor', 'blue');
         this.selectedCells.push({
            cellId: cellId,
            cellNum: cellNum,
            rowNum: rowNum,
            letter: letter
         })
      }
   }

   onMobileTouchEnd() {
      var guess = this.selectedCells.map(cell => cell.letter).join('');
      this.addGuessToState(guess);
      $('.boggle-tile').css('backgroundColor', 'white');
      this.selectedCells = [];
   }

   onChange(e) {
      this.setState({
         input: e.target.value
      });
   }

   onKeyDown(e) {
      if(e.key === 'Enter') {
         var guess = e.target.value;
         this.addGuessToState(guess);
         this.setState({
            input: ''
         });
      }
   }

   guessIsValid(guess) {
      if(this.state.guesses.includes(guess)){
         return false;
      } else {
         return true;
      }
   }

   deviceIsMobile() {
      if( /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
         return true;         
      } else {
         return false;
      }
   }

   renderInputIfMobile() {
      if(!this.deviceIsMobile()) {
         return <input className="boggle-input" type="text" value={this.state.input} onChange={this.onChange.bind(this)} onKeyDown={this.onKeyDown.bind(this)}/>
      } else {
         return null;
      }
   }

   render() {
      return (
         <div>
            <div className="time-remaining">Time Remaining: {this.state.timeRemaining}</div>
               <Guesses guesses={this.state.guesses}/>
               {this.renderInputIfMobile()}
               <BoggleBoard boggle={this.board} onMobileTouchMove={this.onMobileTouchMove.bind(this)} onMobileTouchEnd={this.onMobileTouchEnd.bind(this)} selectedCells={this.selectedCells}/>
         </div>
      )
   }
};

export default Boggle;
