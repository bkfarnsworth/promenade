import React from 'react';
import PropTypes from 'prop-types';

import './GameMenu.css';


const GameTile = (props) => {
   return <div className="game-tile">{props.game.name}</div>;
};

const GameMenu = (props) => {

   let games = props.games || [
      {name: 'Boggle'},
      {name: 'Pong'},
      {name: 'Trivia'},
      {name: 'Hungry Hungry Hippos'},
   ];

   return (
      <div className="game-menu">
         {games.map(g => {
            return <GameTile key={g.name} game={g}/>
         })}
      </div>
   );
}

export default GameMenu;
