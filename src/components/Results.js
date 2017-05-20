import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AppConfig from './../AppConfig'
import _ from 'lodash';
import DebugHelper from './../DebugHelper';
import SocketMixin from './SocketMixin';
import {BoggleBoard} from  './Boggle';

import './Results.css';

const debugMode = false;

const Table = (props) => {
   //expects object like {rows:[cells:[{content:''}]]}
   let table = props.table;
   return (
      <table className={'bf-table ' + props.className}>
         <tbody>
               {table.rows.map((row, ri) => {
                  return (
                     <tr key={ri}>
                        {row.cells.map((cell, ci) => {
                           return <td key={ci}>{cell.content}</td>;
                        })}
                     </tr>
                  );
               })}
         </tbody>
      </table>
   )
}


class Results extends React.Component {

   constructor(props) {
      super(props);
      Object.assign(this, SocketMixin);
   }

   componentDidMount() {
      this.socket.emit('leaveRoom');
   }

   get finalResults() {
      if(debugMode) {
         return DebugHelper.finalResults;
      } else {
         return _.get(this, 'props.location.state.finalResults', []);
      }
   }

   get solution() {
      if(debugMode) {
         return DebugHelper.solutionToBoard1;
      } else {
         return _.get(this, 'props.location.state.solution', []);
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

   get board() {
      if(debugMode) {
         return DebugHelper.board1;
      } else {
         return _.get(this, 'props.location.state.board');
      }
   }

   getFinalResultsSorted() {
      return _.orderBy(this.finalResults, 'score', 'desc');
   }

   getFinalResultsTable() {
      let table = {rows:[]}

      table.rows = this.getFinalResultsSorted().map((result, index) => {
         return {
            cells: [
               {content: (index + 1) + ''},
               {content: result.player},
               {content: result.score}
            ]
         }
      });

      //add a header row
      table.rows.unshift({
         cells: [
            {content: ''},
            {content: 'Name'},
            {content: 'Score'},
         ]
      })

      return table;
   }

   getCommaSeperatedList(words, className, omitFinalPunctuation=true) {
      return (
         <span>
            {words.map((word, wi) => {

               let punctuation = '';
               if(omitFinalPunctuation) {
                  punctuation = wi < words.length - 1 ? ', ' : '';
               } else {
                  punctuation = ', ';
               }

               return (
                  <span>
                     <span className={className}>{word}</span>
                     <span>{punctuation}</span>
                  </span>
               );
            })}   
         </span>
      );
   }

   onPlayAgainClick() {
      let {userName, roomCode, playerType} = this;
      let eventToEmit = playerType === 'host' ? 'hostRoom' : 'joinRoom';
      this.socket.emit(eventToEmit, {roomCode, userName}, () => {
         this.props.history.push({
            pathname: '/waiting',
            state: {playerType, roomCode, userName}
         });
      });
   }

   getWinner() {
      return this.getFinalResultsSorted()[0]
   }

   getLongestWord(result) {
      let allWords = result.scoredWords.concat(result.sharedWords);
      let longestWord = _.maxBy(allWords, 'length');
      return longestWord;
   }

   getPercentFound(result) {
      return _.round((result.scoredWords.length / this.solution.length) * 100) + '%';
   }

   render() {
      return (
         <div>
            <div className="results-container"> 
               <div className="room-config-section">
                  <h1>Winner: {this.getWinner().player}</h1>
                  <Table className="boggle-results-table" table={this.getFinalResultsTable()}/>
                  <button onClick={this.onPlayAgainClick.bind(this)} className="bf-button game-config-button-vertical boggle-play-again-button">Play Again</button>
                  {this.getFinalResultsSorted().map((result, ri) => {
                     return (
                        <div key={ri}>
                           <h3 className="boggle-player-name-header"><b>{result.player}</b></h3>
                           <div><b>Longest Word: </b>{this.getLongestWord(result)}</div>
                           <div><b>Percent Found: </b>{this.getPercentFound(result)}</div>
                           <div>
                              <span><b>All Words: </b></span>
                              {this.getCommaSeperatedList(result.scoredWords, '', false)}
                              {this.getCommaSeperatedList(result.sharedWords, 'shared-word')}
                           </div>
                        </div>
                     );
                  })}
                  <BoggleBoard boggle={this.board}/>
                  <div>All Words:</div>
                  <div>{this.getCommaSeperatedList(this.solution.map(el => el.word))}</div>
               </div>
            </div>
         </div>
      );
   }

}

export default Results;