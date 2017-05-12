import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AppConfig from './../AppConfig'
import _ from 'lodash';
import DebugHelper from './../DebugHelper';

import './Results.css';

const debugMode = false;

class Results extends React.Component {

   constructor(props) {
      super(props)
      this.props = props;
   }

   get socket() {
      return AppConfig.socket;
   }

   get finalResults() {
      if(debugMode) {
         return DebugHelper.finalResults;
      } else {
         return _.get(this, 'props.location.state.finalResults', []);
      }
   }

   get playerType() {
      return _.get(this, 'props.location.state.playerType');
   }

   getFinalResultsSorted() {
      return _.orderBy(this.finalResults, 'score', 'desc');
   }

   getCommaSeperatedList(words) {
      return words.join(', ')
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
            <br/>
            <br/>
            <div> boggle board</div>
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
                        {this.getCommaSeperatedList(result.scoredWords)}
                     </div>
                  </div>
               );
            })}
            <Link to={{pathname: '/waiting', state: {playerType: this.state.playerType}}} className="bf-button game-config-button-vertical">Play Again</Link>
         </div>
      );
   }

}

export default Results;