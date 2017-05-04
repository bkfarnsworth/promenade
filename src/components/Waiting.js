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

   // get hostWaitingComponent() {
   //    return (
   //       <div>Code: 123456</div>
   //       <Link to={'/boggle'}>Start Game</Link>
   //    );
   // }

   // get joinWaitingComponent() {
   //    return (
   //       <div>Waiting for host to start the game</div>
   //    );
   // }

   get waitingComponent() {
      if(this.playerType === 'host') {
         return <div>host</div>
      } else if(this.playerType === 'join') {
         return <div>join</div>
      } else {
         return <div>no player type</div>
      }
   }

   render() {
      return (
         <div>
            <div className="game-logo">Boggle</div>
            {this.waitingComponent}
         </div>
      );
   }

}

export default Waiting;