import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import IO from 'socket.io-client'

import './Room.css';



class Room extends React.Component {

   constructor(props) {
      super(props)
      this.props = props;
      this.state = {
         roomOption: 'start'
      }
   }

   get socket() {
      //TODO this should be global for the whole front end
      this._socket = this._socket || IO();
      return this._socket;
   }

   onCreateRoomClick() {
      let code = '1234'
      this.socket.emit('joinRoom', code, 'HOSTNAME', () => {
         this.props.history.push({
            pathname: '/waiting',
            state: {
               playerType: 'host',
               socket: this.socket
            }
         });
      });
   }

   onJoinRoomClick() {
      let code = '1234'
      this.socket.emit('joinRoom', code, 'Joiner NAME!!!', () => {
         this.props.history.push({
            pathname: '/waiting',
            state: {
               playerType: 'join',
               socket: this.socket
            }
         });
      });
   }

   get configSection() {
      if(this.state.roomOption === 'host') {
         return (
            <div className="room-config-section host-config-section">
               <div className="bf-input-container">Name: <input className="bf-input" type="text"/></div>
               <div className="room-section-button-row">
                  <button className="bf-button game-config-button-horizontal" onClick={this.onCreateRoomClick.bind(this)}>Create Room</button>
                  <button className="bf-button game-config-button-horizontal" onClick={() => {this.setState({roomOption: 'start'})}}>Back</button>
               </div>
            </div>
         );
      } else if(this.state.roomOption === 'join') {

         return (
            <div className="room-config-section">
               <div className="bf-input-container">Name: <input className="bf-input" type="text"/></div>
               <div className="bf-input-container">Code: <input className="bf-input" type="text"/></div>
               <div className="room-section-button-row">
                  <button className="bf-button game-config-button-horizontal" onClick={this.onJoinRoomClick.bind(this)}>Join</button>
                  <button className="bf-button game-config-button-horizontal" onClick={() => {this.setState({roomOption: 'start'})}}>Back</button>
               </div>
            </div>
         );
      } else if(this.state.roomOption === 'start') {
         return (
            <div className="room-config-section">
               <button className="game-config-button-vertical bf-button" onClick={() => {this.setState({roomOption: 'host'})}}>Host Game</button>
               <button className="game-config-button-vertical bf-button" onClick={() => {this.setState({roomOption: 'join'})}}>Join Game</button>
            </div>
         );
      }
   }

   render() {

      return (
         <div>
            <div className="game-logo">Game Title</div>
            <div className="game-config-section">
               {this.configSection}
            </div>
         </div>
      );
   }

}

export default Room;