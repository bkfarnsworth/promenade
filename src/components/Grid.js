import React from 'react';
import _ from 'lodash';
import './Grid.css';

export default function Grid(props) {

   //props = 
      //grid
      //rows / columns
         //rowId/colId
      //have to have cells
         //cellId
   //onRowClick
   //onColumnClick
   //onCellClick  

   let {grid} = props;
   let rows = grid.rows;

   //take colums or rows - always convert to rows
   if(grid.columns) {
      grid = convertColumnsToRows(grid);
   }

   return (
      <div className=".grid-container">
         <div className="grid">
            {grid.rows.map((row, index) => {
               return <Row row={row} rowNum={index} key={row.id || index}/>;
            })}
         </div>
      </div>
   );
}

const Row = (props) => {
   let row = props.row;
   let style = {top: (props.rowNum * 25) + '%'}
   return (
      <div className="row" style={style}>
         {row.cells.map((cell, cellNum) => {
            return <Cell key={cell.id} cell={cell} cellNum={cellNum} rowNum={props.rowNum}/>
         })}
      </div>
   );
}

const Cell = props => {
   let cell = props.cell;
   let style = { left: (props.cellNum * 25) + '%' }
   return (
      <div className="cell" style={style} data-cell-id={cell.id} data-cell-num={props.cellNum} data-row-num={props.rowNum} data-letter={cell.text}>
         <div className="boggle-hit-zone">
            <div className="boggle-letter">
               O
            </div>
         </div>
      </div>
   );
}

function convertColumnsToRows(grid) {

   let newGrid = {};

   //create number of rows equal to the cells in a column
   newGrid.rows = [];
   for (var i = 0; i < grid.columns[0].cells.length; i++) {
      newGrid.rows.push({
         rowId: i,
         cells:[]
      });
   };

   //transfer each cell from the columns to the rows
   grid.columns.forEach(col => {
      col.cells.forEach((cell, cellIndex) => {
         newGrid.rows[cellIndex].cells.push(cell);
      });
   });

   return newGrid;
}


























