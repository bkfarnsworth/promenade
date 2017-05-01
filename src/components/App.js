import React from 'react';
import PropTypes from 'prop-types';
import Boggle from './Boggle';
import _ from 'lodash';

import '../assets/stylesheets/base.scss';
import './App.scss';


let alphabet = ["a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z"];
let shuffledLetters = _.shuffle(alphabet);

let boggle = {
   rows: []
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


const App = (props) => {
   return (
      <div className="page">
         <Boggle boggle={boggle}/>
      </div>
   )
};

export default App;
