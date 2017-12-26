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

	// let src = "res/images/03187980bb5617a87083289b4b61bf11.jpg"
	let src = "res/images/still_life___chess_set_by_markdaniel-d6llpw6.jpg"

	return (
		<div>
			<div className="nav-bar">&nbsp;&nbsp;Games&nbsp;&nbsp; | &nbsp;&nbsp;About&nbsp;&nbsp; | &nbsp;&nbsp;Contact&nbsp;&nbsp;</div>
			<div id="welcome-to" className="words-of-interest">Welcome to</div>
			<div id="the-promenade" className="words-of-interest">The Promenade</div>
			<img src={src} />
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
