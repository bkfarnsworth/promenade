import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AppConfig from './../AppConfig'
import _ from 'lodash';

import './Waiting.css';



class Waiting extends React.Component {

   constructor(props) {
      super(props)
      this.props = props;

      this.state = {
         players: []
      }
   }

   get socket() {
      return AppConfig.socket;
   }

   get playerType() {
      return _.get(this, 'props.location.state.playerType');
   }

   componentDidMount() {
      this.socket.emit('getRoomMembers', '1234', (data) => {
         this.updatePlayersList(data.roomMembers);
      });

      this.socket.on('newRoomMember', (data) => {
         this.updatePlayersList(data.roomMembers);
      });

      this.socket.on('gameStarted', this.onGameStart.bind(this));
   }

   updatePlayersList(roomMembers) {
      this.setState({
         players: roomMembers
      })
   }

   onStartGameClick() {
      this.socket.emit('startGame', '1234');
   }

   onGameStart(data) {
      this.props.history.push({
         pathname: '/boggle',
         state: {
            board: data.board
         }
      });
   }

   get hostWaitingComponent() {
      return (
         <div className="room-config-section">
            <div>Code: 123456</div>
            <button className="bf-button" onClick={this.onStartGameClick.bind(this)}>Start Game</button>
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
            {this.state.players.map(p => {
               return <div>{p}</div>
            })}
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