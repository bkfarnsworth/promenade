import React from 'react';
import PropTypes from 'prop-types';
import GameMenu from './GameMenu';
import Boggle from './Boggle';
import _ from 'lodash';
import IO from 'socket.io-client'

import './App.css';

class App extends React.Component  {

   constructor() {
      super();
      this.state = {
         currentGame: null
      }
   }

   onTileClick(tileName) {
      this.setState({
         currentGame: tileName
      });
   }

   getGameComponent(name) {
      switch (name) {
         case 'Boggle':
            return <Boggle/>
         case 'Pong':
         case 'Trivia':
            return <div>Coming soon!</div>
         default:
            return <div>Coming soon!</div>
      }
   }

   render() {
      if(this.state.currentGame) {
         return this.getGameComponent(this.state.currentGame);
      } else {
         return <GameMenu onTileClick={this.onTileClick.bind(this)}/>
      }
   }

}

export default App;
