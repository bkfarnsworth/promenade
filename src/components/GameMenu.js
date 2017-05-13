import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

import './GameMenu.css';


const GameTile = (props) => {

   let to = {
      pathname: '/' + props.game.initialState,
      state: {
         game: props.game
      }
   }

   return (
      <Link to={to} className="game-tile bf-button">{props.game.name}</Link>
   );
};

const GameMenu = (props) => {

   let games = props.games;

   return (
      <div className="game-menu-container">
         <div className="game-menu">
            {games.map(g => {
               return <GameTile key={g.name} game={g}/>
            })}
         </div>
      </div>
   );
}

GameMenu.defaultProps = {};

export default GameMenu;
