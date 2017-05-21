import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import AppConfig from './../AppConfig'
import _ from 'lodash';
import SocketMixin from './SocketMixin';

import './Waiting.css';



class Waiting extends React.Component {

	constructor(props) {
		super(props)
		this.props = props;
		Object.assign(this, SocketMixin);

		this.state = {
			players: []
		}
	}

	get playerType() {
		return _.get(this, 'props.location.state.playerType');
	}

	get roomCode() {
		return _.get(this, 'props.location.state.roomCode');
	}

	get userName() {
		return _.get(this, 'props.location.state.userName');
	}

	get game() {
		return _.get(this, 'props.location.state.game');
	}

	componentDidMount() {
		this.socket.emit('getRoomMembers', (data) => {
			this.updatePlayersList(data.roomMembers);
		});

		this.onSocketEvent('newRoomMember', (data) => {
			this.updatePlayersList(data.roomMembers);
		});

		this.onSocketEvent('gameStarted', this.onGameStart.bind(this));
	}

	componentWillUnmount() {
		this.callOffFuncs();
	}

	updatePlayersList(roomMembers) {
		this.setState({
			players: roomMembers
		})
	}

	onStartGameClick() {
		this.socket.emit('startGame');
	}

	onGameStart(data) {
		this.props.history.push({
			pathname: this.game.getPath(),
			state: {
				gameProps: data,
				playerType: this.playerType,
				roomCode: this.roomCode,
				userName: this.userName
			}
		});
	}

	get hostWaitingComponent() {
		return (
			<div className="room-config-section">
				<div>Code: {this.roomCode}</div>
				<button className="bf-button" onClick={this.onStartGameClick.bind(this)}>Start Game</button>
			</div>
		);
	}

	get joinWaitingComponent() {
		return (
			<div>Waiting for host to start the game</div>
		);
	}

	get playersComponent() {
		return (
			<div>
				<div>Players:</div>
				{this.state.players.map(p => {
					return <div>{p}</div>
				})}
			</div>
		)
	}

	get waitingComponent() {
		if(this.playerType === 'host') {
			return <div>{this.hostWaitingComponent}</div>
		} else if(this.playerType === 'join') {
			return <div>{this.joinWaitingComponent}</div>
		} else {
			return <div>no player type</div>
		}
	}

	render() {
		return (
			<div className="room-config-section">
				<div className="game-logo">{this.game.name}</div>
				{this.waitingComponent}
				{this.playersComponent}
			</div>
		);
	}

}

export default Waiting;