import React from 'react';
import PropTypes from 'prop-types';
import GameMenu from './GameMenu';
import Boggle from './Boggle';
import Pong from './Pong';
import _ from 'lodash';
import Room from './Room';
import Waiting from './Waiting';
import Results from './Results';
import { HashRouter, Switch, Route, Link } from 'react-router-dom'
import IO from 'socket.io-client'
import AppConfig from './../AppConfig'
import SocketMixin from './SocketMixin';
import './App.css';

class Game {

	constructor(opts={}) {

		_.defaults(opts, {
			name: 'Game Name',
			getGameComponent: () => <div>Game Component</div>,
			initialState: 'room'
		});

		this.name = opts.name;
		this.getGameComponent = opts.getGameComponent;
		this.initialState = opts.initialState;
	}

	getPath() {
		return '/' + this.name;
	}
}

class App extends React.Component  {

	constructor(props) {
		super(props);
		Object.assign(this, SocketMixin);
		AppConfig.socket = IO();
	}

	get games() {
		return [
			new Game({
				name: 'Boggle',
				getGameComponent: (props) => <Boggle {...props}/>,
				initialState: 'room'
			}),
			new Game({
				name: 'Pong',
				getGameComponent: (props) => <Pong {...props}/>,
				initialState: 'room'
			}),
			new Game({
				name: 'Trivia'
			}),
			new Game({
				name: 'Hippos'
			})
		];
	}

	getGameMenu() {
		return <GameMenu games={this.games} />;
	}

	render() {
		return (
			<HashRouter>
				<Switch>
					<Route exact path='/' component={this.getGameMenu.bind(this)}/>
					<Route exact path='/room' component={Room} />
					<Route exact path='/waiting' component={Waiting} />
					<Route exact path='/results' component={Results} />
					{this.games.map(game => {
						return <Route key={game.name} path={game.getPath()} component={game.getGameComponent} />
					})}
				</Switch>
			</HashRouter>          
		)
	}
}

const ComingSoon = () => {
	return <div>Coming soon</div>;
}

export default App;