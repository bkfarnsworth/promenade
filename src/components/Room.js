import React from 'react';
import PropTypes from 'prop-types';

import './Room.css';



class Room extends React.Component {

   constructor() {
      super()
      this.state = {
         roomOption: 'start'
      }
   }

   get configSection() {
      if(this.state.roomOption === 'host') {
         return (
            <div className="room-config-section host-config-section">
               <div className="bf-input-container">Name: <input className="bf-input" type="text"/></div>
               <div className="room-section-button-row">
                  <button className="bf-button game-config-button-horizontal">Create Room</button>
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
                  <button className="bf-button game-config-button-horizontal">Join</button>
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