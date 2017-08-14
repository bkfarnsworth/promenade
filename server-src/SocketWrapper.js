const _ = require('lodash');

class SocketWrapper {

	constructor(socket, game) {
		this.socket = socket;
		this.game = game;//CACHING this just for convenience - we shouldn't do anythign on it. 
	}

	leaveRoom(roomName='') {
		if(roomName) {
			this.socket.leave(roomName);
		} else {
			this.roomNames.forEach(roomName => this.socket.leave(roomName));
		}
	}

	get rooms() {
		return this.socket.rooms;
	}

	get roomNames() {
		return Object.keys(this.socket.rooms);
	}

	joinRoom(roomCode, userName) {
		this.userName = userName
		this.socket.join(roomCode);
	}

}

module.exports = SocketWrapper;


