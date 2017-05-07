import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AppConfig from './../AppConfig'
import _ from 'lodash';

import './Results.css';

class Results extends React.Component {

   constructor(props) {
      super(props)
      this.props = props;
   }

   get socket() {
      return AppConfig.socket;
   }

   get finalResults() {
      return _.get(this, 'props.location.state.finalResults');
   }

   render() {
      return (
         <div className="room-config-section">
            {this.finalResults.map(result => {
               return (
                  <div>
                     {result.player} : {result.score}
                     <div>words:</div>
                     {result.scoredWords.map(w => {
                        return <div>{w}</div>
                     })}
                  </div>
               );
            })}
         </div>
      );
   }

}

export default Results;