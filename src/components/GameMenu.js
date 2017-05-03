import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom'

import './GameMenu.css';


const GameTile = (props) => {
   return (
      <div className="game-tile" >
         <Link to={'/' + props.game.name}>{props.game.name}</Link>
      </div>
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
