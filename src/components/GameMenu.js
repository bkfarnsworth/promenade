import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

import './GameMenu.css';


const GameTile = (props) => {
   return (
      <Link to={'/' + props.game.initialState} className="game-tile bf-button">{props.game.name}</Link>
   );
};

const GameMenu = (props) => {

   let games = props.games;

   return (
      <div className="game-menu">
         {games.map(g => {
            return <GameTile key={g.name} game={g}/>
         })}
      </div>
   );
}

GameMenu.defaultProps = {};

export default GameMenu;
