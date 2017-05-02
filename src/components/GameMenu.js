import React from 'react';
import PropTypes from 'prop-types';

import './GameMenu.css';


const GameTile = (props) => {
   return <button className="game-tile" onClick={props.onClick.bind(null, props.game.name)}>{props.game.name}</button>;
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
            return <GameTile key={g.name} onClick={props.onTileClick} game={g}/>
         })}
      </div>
   );
}
GameMenu.defaultProps = {
   onTileClick: () => {}
};

export default GameMenu;
