const _ = require('lodash');

class Game {

	constructor(io, roomCode) {
		this.timeRemaining = undefined;
		this.roomCode = roomCode;
		this.io = io;
		this.socketWrappers = new Set();
	}

	start() {
		this.startTimer();
		this.emitToRoom('gameStarted');
	}

	startTimer() {
		this.timeRemaining = this.gameTime;
		var id = setInterval(() => {
			this.emitToRoom('timeRemainingUpdate', this.timeRemaining);
			if(this.timeRemaining === 0) {
				clearInterval(id);      
			} else {
				this.timeRemaining--;
			}
		}, 1000);
	}

	get debugMode() {
		return false;
	}

	get gameTime() {
		return this.debugMode ? 20 : 120;
	}


	getSockets(cb) {
		this.io.in(this.roomCode).clients((error, clients) => {
			cb(clients);
		});
	}

	emitToRoom(eventName, data) {
		this.io.in(this.roomCode).emit(eventName, data);
	}

	emitNewRoomMember(game) {
	  //emit to all members that there is a new member
	  this.getUsernamesForRoom((names) => {
	    this.emitToRoom('newRoomMember', {roomMembers: names})
	  });
	}

	getUsernamesForRoom(cb) {
		//using the callback because I keep switching between cached and lookup
		cb(Array.from(this.socketWrappers).map(s => s.userName));
	}

	// PONG STUFF -----------------------------
	// gameUpdate(data) {
	// 	delete data.socketId;
	// 	this.emitToRoom('clientUpdate', data);
	// }

	// gameScores(data) {
	// 	delete data.socketId;
	// 	this.emitToRoom('clientUpdateScores', data);
	// }

	// gameBall(data) {
	// 	delete data.socketId;
	// 	this.emitToRoom('clientUpdateBall', data);
	// }

}

module.exports = Game;