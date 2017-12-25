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
   //onCellClick

   let {grid, cellContents, onCellClick} = props;
   let rows = grid.rows;

   //take colums or rows - always convert to rows
   if(grid.columns) {
      grid = convertColumnsToRows(grid);
   }

   return (
      <div className="grid-container">
         <div className="grid">
            {grid.rows.map((row, rowNum) => {
               let cellProps = {row, rowNum, key: row.id || rowNum}
               return <Row {...cellProps} {...props}/>;
            })}
         </div>
      </div>
   );
}

const Row = (props) => {
   let {row, cellContents} = props;
   let style = {top: (props.rowNum * 25) + '%'};
   return (
      <div className="row" style={style}>
         {row.cells.map((cell, cellNum) => {
            let cellProps = {cell, cellNum, key: cell.id};
            return <Cell {...cellProps} {...props}/>;
         })}
      </div>
   );
}

const Cell = props => {
   let cell = props.cell;
   let style = { left: (props.cellNum * 25) + '%' }
   return (
      <div className="cell" onTouchEnd={() => props.onCellClick(cell)} onClick={() => props.onCellClick(cell)} style={style} data-cell-id={cell.id} data-cell-num={props.cellNum} data-row-num={props.rowNum}>
         {props.cellContents({cell})}
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


























