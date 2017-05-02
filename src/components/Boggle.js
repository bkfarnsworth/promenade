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

const Boggle = (props) => {
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


// Boggle.propTypes = {

// }

export default Boggle;
