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
      return _.get(this, 'props.location.state.solution', []);
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
      return _.get(this, 'props.location.state.board');
   }

   getFinalResultsSorted() {
      return _.orderBy(this.finalResults, 'score', 'desc');
   }

   getCommaSeperatedList(words) {
      return words.join(', ')
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

   render() {
      return (
         <div className="room-config-section">
            <div>Results</div>
            {this.getFinalResultsSorted().map(result => {
               return (
                  <div>
                     {result.player} : {result.score}
                  </div>
               );
            })}
            <br/>
            <br/>
            <button onClick={this.onPlayAgainClick.bind(this)} className="bf-button game-config-button-vertical">Play Again</button>
            <br/>
            <br/>
            <br/>
            <BoggleBoard boggle={this.board}/>
            <br/>
            <br/>
            <br/>
            {this.getFinalResultsSorted().map(result => {
               return (
                  <div>
                     <br/>
                     <div>
                        <b>{result.player}</b>
                     </div>
                     <div>
                        Scored Words: {this.getCommaSeperatedList(result.scoredWords)}
                     </div>
                     <div>
                        Shared Words: {this.getCommaSeperatedList(result.sharedWords)}
                     </div>
                     <div>
                        Invalid Words: {this.getCommaSeperatedList(result.invalidWords)}
                     </div>
                  </div>
               );
            })}
            <br/>
            <br/>
            <br/>
            <div>All Words:</div>
            <div>{this.getCommaSeperatedList(this.solution.map(el => el.word))}</div>
         </div>
      );
   }

}

export default Results;