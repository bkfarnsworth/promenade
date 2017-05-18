import React from 'react';
import PropTypes from 'prop-types';
import AppConfig from './../AppConfig';
import SocketMixin from './SocketMixin';
import DebugHelper from './../DebugHelper';
import './Boggle.css';
import _ from 'lodash';

const debugOpts = {
   board: true
}


const BoggleCell = (props) => {
   let cell = props.cell;
   // let style = {left: (props.cellNum * 25 + (props.cellNum/2)) + '%'}
   let style = {left: (props.cellNum * 25) + '%'}
   return (
      <div className="boggle-tile" style={style}>
         <div className="boggle-letter">
            {cell.text}
         </div>
      </div>
   );
}

const BoggleRow = (props) => {
   let row = props.row;
   // let style = {top: (props.rowNum * 25+ (props.rowNum/2)) + '%'}
   let style = {top: (props.rowNum * 25) + '%'}
   return (
      <div className="boggle-row" style={style}>
         {row.cells.map((cell, cellNum) => {
            return <BoggleCell key={cell.id} cell={cell} cellNum={cellNum}/>
         })}
      </div>
   )
}

export const BoggleBoard = (props) => {
   let boggle = props.boggle;
   return (
      <div className="boggle-board">
         {boggle.rows.map((row, index) => {
            return <BoggleRow key={row.id} row={row} rowNum={index}/>
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
      var guesses = this.state.guesses.slice();
      guesses.push(guess);
      this.setState({
         guesses: guesses,
      });
   }

   onChange(e) {
      this.setState({
         input: e.target.value
      });
   }

   onKeyDown(e) {
      if(e.key === 'Enter') {
         var guess = e.target.value;

         if(this.guessIsValid(guess)) {
            this.addGuessToState(guess);
         }

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
      if(this.deviceIsMobile()) {
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
               <BoggleBoard boggle={this.board}/>
            {this.renderInputIfMobile()}
         </div>
      )
   }
};

export default Boggle;
