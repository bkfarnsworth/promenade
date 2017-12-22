import React from 'react';
import PropTypes from 'prop-types';
import AppConfig from './../AppConfig';
import SocketMixin from './SocketMixin';
import DebugHelper from './../DebugHelper';
import './CodeNames.css';
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



       let board = {
          rows: [
             {cells: [{name: 'noun', team:'red'}, {name: 'noun', team:'red'}, {name: 'noun', team:'red'}, {name: 'noun', team:'red'}, {name: 'noun', team:'red'}]},
             {cells: [{name: 'noun', team:'red'}, {name: 'noun', team:'red'}, {name: 'noun', team:'red'}, {name: 'noun', team:'neutral'}, {name: 'noun', team:'neutral'}]},
             {cells: [{name: 'noun', team:'neutral'}, {name: 'noun', team:'neutral'}, {name: 'noun', team:'neutral'}, {name: 'noun', team:'neutral'}, {name: 'noun', team:'neutral'}]},
             {cells: [{name: 'noun', team:'blue'}, {name: 'noun', team:'blue'}, {name: 'noun', team:'blue'}, {name: 'noun', team:'blue'}, {name: 'noun', team:'blue'}]},
             {cells: [{name: 'noun', team:'blue'}, {name: 'noun', team:'blue'}, {name: 'noun', team:'blue'}, {name: 'noun', team:'blue'}, {name: 'noun', team:'assassin'}]},
          ]
       }


       let hintGiver = true;

         return (
            <div className="code-names">
               <Board board={board}/>
               {hintGiver ? <BoardMap board={board}/> : null}
            </div>
         )
      // }
   }
};

function generateBoard() {

   //so it gets the 25 nouns

   //makes 5 by 5 thing

   //decides random if red or blue goes first

   // picks 9 random cells for first team, 8 for second team

   //picks 1 of remaining cells for assassin

   //the rest are marked as nuetral

}

const BoardMap = (props) => {
   let {board} = props;

   let cellContents = (cellContentProps) => {
      let {cell} = cellContentProps;
      return (
         <div> 
            {cell.team}
         </div>
      );
   }

   return <Grid grid={board} cellContents={cellContents}/>
}

const Board = (props) => {
   let {board} = props;


   let cellContents = (cellContentProps) => {
      let {cell} = cellContentProps;
      return <div>{cell.name}</div>;
   }

   return <Grid grid={board} cellContents={cellContents}/>
}

export default CodeNames;
