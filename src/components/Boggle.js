import React from 'react';
import PropTypes from 'prop-types';
import AppConfig from './../AppConfig';

import './Boggle.css';


const BoggleCell = (props) => {
   let cell = props.cell;
   return <div className="boggle-tile">{cell.text}</div>;
}

const BoggleRow = (props) => {
   let row = props.row;
   return (
      <div className="boggle-row">
         {row.cells.map(cell => <BoggleCell key={cell.text} cell={cell}/>)}
      </div>
   )
}

const BoggleBoard = (props) => {
   let boggle = props.boggle;
   return (
      <div className="boggle-board">
         {boggle.rows.map(row => {
            let rowKey = row.cells.map(c => c.text).join('');
            return <BoggleRow key={rowKey} row={row}/>
         })}
      </div>
   );
};

class Boggle extends React.Component  {

   constructor(props) {
      super(props)
      this.props = props;
      this.state = {
         input: '',
         guesses: []
      }
   }

   get board() {
      return _.get(this, 'props.location.state.board');
   }

   get socket() {
      return AppConfig.socket;
   }

   componentDidMount() {
      this.socket.on('timeRemainingUpdate', (timeRemaining) => {
         this.setState({
            timeRemaining
         })
      })
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
            // this.socket.emit('guess', guess);
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

   render() {
      return (
         <div className="page">
            <div className="boggle-input-area">
               <div>Time Remaining: {this.state.timeRemaining}</div>
               <BoggleBoard boggle={this.board}/>
               <input className="boggle-input" type="text" value={this.state.input} onChange={this.onChange.bind(this)} onKeyDown={this.onKeyDown.bind(this)}/>
            </div>
            <div className="boggle-guess-list">
               <b>Guesses:</b>
               {this.state.guesses.map(g => {
                  return <div key={g}>{g}</div>;
               })}
            </div>
         </div>
      )
   }
};

export default Boggle;
