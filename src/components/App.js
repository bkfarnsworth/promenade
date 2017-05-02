import React from 'react';
import PropTypes from 'prop-types';
import GameMenu from './GameMenu';
import Boggle from './Boggle';
import _ from 'lodash';
import IO from 'socket.io-client'

import './App.css';

class App extends React.Component  {

   render() {
      return <GameMenu/>
      // return <Boggle/>
   }

}

export default App;
