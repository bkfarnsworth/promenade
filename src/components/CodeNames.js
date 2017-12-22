import React from 'react';
import PropTypes from 'prop-types';
import AppConfig from './../AppConfig';
import SocketMixin from './SocketMixin';
import DebugHelper from './../DebugHelper';
// import './Boggle.css';
import _ from 'lodash';
// import $ from 'jquery';
import Grid from './Grid';

class CodeNames extends React.Component  {

   constructor(props) {
      super(props)
      Object.assign(this, SocketMixin);
      Object.assign(this, props);
      Object.assign(this, _.get(props, 'location.state', {}));
      Object.assign(this, _.get(props, 'location.state.gameProps', {}));
      this.state = {
         needsConfig: true
      }
   }

   componentWillUnmount() {
      this.callOffFuncs();
   }

   // getConfigComponent() {
   //    return () => <div>config</div>;      
   // }

   render() {

      // let {
      //    needsConfig
      // } = this.state;

      // let Config = this.getConfigComponent();
      // let Board = this.getBoardComponent();
      // let BoardMap = this.getBoardMapComponent();

      // if(needsConfig) {
      //    return <Config playerType={this.playerType}/>
      // } else {

       // {hintGiver ? <BoardMap/> : null}

         return (
            <div>
               <Board/>
            </div>
         )
      // }
   }
};

const CellContents = (props) => {
   let {cell} = props;
   return <div>{cell.name}</div>;
}

const Board = (props) => {

   let board = {
      rows: [
         {cells: [{name: 'noun'}, {name: 'noun'}, {name: 'noun'}, {name: 'noun'}]},
         {cells: [{name: 'noun'}, {name: 'noun'}, {name: 'noun'}, {name: 'noun'}]},
         {cells: [{name: 'noun'}, {name: 'noun'}, {name: 'noun'}, {name: 'noun'}]},
         {cells: [{name: 'noun'}, {name: 'noun'}, {name: 'noun'}, {name: 'noun'}]},
         {cells: [{name: 'noun'}, {name: 'noun'}, {name: 'noun'}, {name: 'noun'}]},
      ]
   }

   return <Grid grid={board} cellContents={CellContents}/>
}

export default CodeNames;
