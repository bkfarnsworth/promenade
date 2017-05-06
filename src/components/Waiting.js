import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import _ from 'lodash';

import './Waiting.css';



class Waiting extends React.Component {

   constructor(props) {
      super(props)
      this.playerType = _.get(props, 'location.state.playerType');
   }

   get hostWaitingComponent() {
      return (
         <div className="room-config-section">
            <div>Code: 123456</div>
            <Link className="bf-button" to={'/boggle'}>Start Game</Link>
         </div>
      );
   }

   get joinWaitingComponent() {
      return (
         <div>Waiting for host to start the game</div>
      );
   }

   get playersComponent() {
      return (
         <div>
            <div>Players:</div>
            <div>Brian</div>
            <div>Rose</div>
            <div>Tamson</div>
            <div>Miles</div>
         </div>
      )
   }

   get waitingComponent() {
      if(this.playerType === 'host') {
         return <div>{this.hostWaitingComponent}</div>
      } else if(this.playerType === 'join') {
         return <div>{this.joinWaitingComponent}</div>
      } else {
         return <div>no player type</div>
      }
   }

   render() {
      return (
         <div className="room-config-section">
            <div className="game-logo">Boggle</div>
            {this.waitingComponent}
            {this.playersComponent}
         </div>
      );
   }

}

export default Waiting;