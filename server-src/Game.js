const _ = require('lodash');

class Game {

	constructor(io, roomCode) {
		this.timeRemaining = undefined;
		this.io = io;
		this.roomCode = roomCode;
		this.socketUsernameMap = {};
	}

	start() {
		this.startTimer();
		this.io.to(this.roomCode).emit('gameStarted');
	}

	startTimer() {
		this.timeRemaining = this.gameTime;
		var id = setInterval(() => {
			this.io.to(this.roomCode).emit('timeRemainingUpdate', this.timeRemaining);
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

}

module.exports = Game;