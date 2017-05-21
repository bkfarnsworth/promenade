import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import IO from 'socket.io-client'
import AppConfig from './../AppConfig';
import SocketMixin from './SocketMixin';

import './Room.css';



class Room extends React.Component {

	constructor(props) {
		super(props)
		Object.assign(this, SocketMixin);
		Object.assign(this, props);
		Object.assign(this, _.get(props, 'location.state', {}));
		
		this.state = {
			roomOption: 'start',
			userName: '',
			roomCode: ''
		}
	}

	onCreateRoomClick() {
		let {userName} = this.state;
		this.socket.emit('hostRoom', {userName}, (roomCode) => {
			this.props.history.push({
				pathname: '/waiting',
				state: {
					playerType: 'host',
					roomCode: roomCode,
					userName: userName,
					game: this.game
				}
			});
		});
	}

	onJoinRoomClick() {
		let {userName, roomCode} = this.state;
		this.socket.emit('joinRoom', {roomCode, userName}, () => {
			this.props.history.push({
				pathname: '/waiting',
				state: {
					playerType: 'join',
					userName: userName,
					roomCode: roomCode,
					game: this.game
				}
			});
		});
	}

	onInputChange(key, e) {
		this.setState({
			[key]: e.target.value
		});
	}

	get configSection() {
		if(this.state.roomOption === 'host') {
			return (
				<div className="room-config-section host-config-section">
					<div className="bf-input-container">Name: <input className="bf-input" value={this.state.userName} type="text" onChange={this.onInputChange.bind(this, 'userName')}/></div>
					<div className="room-section-button-row">
						<button className="bf-button game-config-button-horizontal" onClick={this.onCreateRoomClick.bind(this)}>Create Room</button>
						<button className="bf-button game-config-button-horizontal" onClick={() => {this.setState({roomOption: 'start'})}}>Back</button>
					</div>
				</div>
			);
		} else if(this.state.roomOption === 'join') {

			return (
				<div className="room-config-section">
					<div className="bf-input-container">Name: <input className="bf-input" type="text" value={this.state.userName} onChange={this.onInputChange.bind(this, 'userName')}/></div>
					<div className="bf-input-container">Code: <input className="bf-input" type="text" value={this.state.roomCode} onChange={this.onInputChange.bind(this, 'roomCode')}/></div>
					<div className="room-section-button-row">
						<button className="bf-button game-config-button-horizontal" onClick={this.onJoinRoomClick.bind(this)}>Join</button>
						<button className="bf-button game-config-button-horizontal" onClick={() => {this.setState({roomOption: 'start'})}}>Back</button>
					</div>
				</div>
			);
		} else if(this.state.roomOption === 'start') {
			return (
				<div className="room-config-section">
					<button className="game-config-button-vertical bf-button" onClick={() => {this.setState({roomOption: 'host'})}}>Host Game</button>
					<button className="game-config-button-vertical bf-button" onClick={() => {this.setState({roomOption: 'join'})}}>Join Game</button>
				</div>
			);
		}
	}

	render() {
		return (
			<div>
				<div className="game-logo">{this.game.name}</div>
				<div className="game-config-section">
					{this.configSection}
				</div>
			</div>
		);
	}

}

export default Room;