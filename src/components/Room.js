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

   render() {

      if(this.state.roomOption === 'host') {
         return (
            <div>
               name: <input type="text"/>
               <button>Create Room</button>
               <button onClick={() => {this.setState({roomOption: 'start'})}}>Back</button>
            </div>
         );
      } else if(this.state.roomOption === 'join') {
         return (
            <div>
               name: <input type="text"/>
               code: <input type="text"/>
               <button>Join</button>
               <button onClick={() => {this.setState({roomOption: 'start'})}}>Back</button>
            </div>
         );
      } else if(this.state.roomOption === 'start') {
         return (
            <div>
               <div className="game-logo">Game Title</div>
               <div className="game-config-section">
                  <button className="game-config-button bf-button" onClick={() => {this.setState({roomOption: 'host'})}}>Host Game</button>
                  <button className="game-config-button bf-button" onClick={() => {this.setState({roomOption: 'join'})}}>Join Game</button>
               </div>
            </div>
         );
      }
   }

}

export default Room;