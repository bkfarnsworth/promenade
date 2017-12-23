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
		<div>
			<div className="welcome-message">The Promenade</div>
			<div className="divider"></div>
			<img src="res/images/still_life___chess_set_by_markdaniel-d6llpw6.jpg" style={{margin: '0 auto', display: 'block'}}/>
			<img src="res/images/cn5713_petersburg2-high.jpg" style={{margin: '0 auto', display: 'block'}}/>
			<img src="res/images/03187980bb5617a87083289b4b61bf11.jpg" style={{margin: '0 auto', display: 'block'}}/>
			<img src="res/images/images (1).jpeg" style={{margin: '0 auto', display: 'block'}}/>
			<img src="res/images/images (1).jpeg" style={{margin: '0 auto', display: 'block'}}/>
			<div className="game-menu-container">
				<div className="game-menu">
					{games.map(g => {
						return <GameTile key={g.name} game={g}/>
					})}
				</div>
			</div>
		</div>
	);
}

GameMenu.defaultProps = {};

export default GameMenu;
