import React from 'react';
import PropTypes from 'prop-types';

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

   constructor() {
      super()
      this.state = {
         input: '',
         guesses: []
      }

      this.createBoggleModel();
   }

   componentDidMount() {
      // this.socket = IO();
      // this.socket.on('guess', (guess) => {
      //    this.addGuessToState(guess);
      // });
   }

   addGuessToState(guess) {
      var guesses = this.state.guesses.slice();
      guesses.push(guess);
      this.setState({
         guesses: guesses,
      });
   }

   createBoggleModel() {
      //this will be made on the server
      let alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
      let shuffledLetters = _.shuffle(alphabet);

      let boggle = {
         rows: [],
         validWords: ['cat', 'bat', 'sat']
      };

      //create boggle board
      var rows = boggle.rows;
      var currentLetterIndex = 0;
      while(rows.length < 4) {
         var currentRow = {
            cells: []
         }
         rows.push(currentRow);

         while(currentRow.cells.length < 4) {
            var letter = shuffledLetters[currentLetterIndex];
            currentRow.cells.push({
               text: letter
            });
            currentLetterIndex++;
         }
      }

      this.boggle = boggle;
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
               <BoggleBoard boggle={this.boggle}/>
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
