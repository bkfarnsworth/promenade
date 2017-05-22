const _ = require('lodash');
const Game = require('./Game.js');
const hri = require('human-readable-ids').hri

class SocketUtil {

	constructor(socket, io, appConfig) {
		this.socket = socket;
		this.io = io;
		this.appConfig = appConfig;
	}

	get roomCode() {
		return _.get(this, 'game.roomCode');
	}

	removeNonAlphanumericChars(str) {
		return str.replace(/[^a-z0-9]/g, '');
	}

	//make case-insensitive
	//remove any non-alphanumeric chars (espcially spaces and -'s)
	//since our codes are like nice-giraffe-89, I want people to be able to type in:
	//nice-giraffe-89, nicegiraffe89, nice giraffe 89, or NiceGiraffe89
	processRoomCode(code) {
		let processedStr = code;
		processedStr = processedStr.toLowerCase();
		processedStr = this.removeNonAlphanumericChars(processedStr);
		return processedStr;
	}

	hostRoom(opts={}, cb) {

		_.defaults(opts, {
			roomCode: hri.random(), //allow someday them to be able to type in a custom room code
			userName: 'default userName'
		});

		this.joinRoom(opts, cb);
	}

	joinRoom(opts={}, cb) {

		_.defaults(opts, {
			roomCode: undefined,
			userName: 'default userName'
		});
		let {roomCode, userName} = opts;

		//process the roomCode (handle case sensitivity etc)
		let originalRoomCode = roomCode;
		roomCode = this.processRoomCode(roomCode);

		//join the room
		this.socket.join(roomCode);

		//save the username
		this.userName = userName;

		//get the game
		this.appConfig.gameMap[roomCode] = this.appConfig.gameMap[roomCode] || new Game(this.io, roomCode);
		this.game = this.appConfig.gameMap[roomCode]

		//add the username to the map
		this.game.socketUsernameMap[this.socket.id] = userName;

		//callback - send the original name so we can display the dasherized room name
		cb(originalRoomCode);

		//emit to all members that there is a new member
		this.getUsernamesForRoom((names) => {
			this.emitToRoom('newRoomMember', {roomMembers: names})
		})
	}

	leaveRoom() {
		this.socket.leave(this.roomCode);
	}

	getUsernamesForRoom(cb) {
		this.io.in(this.roomCode).clients((error, clients) => {
			cb(clients.map(c => this.game.socketUsernameMap[c]));
		});
	}

	getRoomMembers(cb) {
		this.getUsernamesForRoom((names) => {
			cb({
				roomMembers: names
			})
		});
	}

	emitToRoom(eventName, data) {
		this.io.in(this.roomCode).emit(eventName, data);
	}

	startGame() {
		this.game.start();
	}



	submitResults(data) {
		this.game.addResult(this.userName, data.words);
		this.getRoomMembers(data => {
			let members = data.roomMembers;
			if(this.game.playerResults.length === members.length) {
				let finalResults = this.game.calculateFinalResults();
				this.emitToRoom('finalResults', {
					finalResults,
					solution: this.game.solution
				})
			}
		});
	}


	// PONG STUFF -----------------------------

	
	gameUpdate(data) {
		delete data.socketId;
		this.emitToRoom('clientUpdate', data);
	}

	gameScores(data) {
		delete data.socketId;
		this.emitToRoom('clientUpdateScores', data);
	}

	gameBall(data) {
		delete data.socketId;
		this.emitToRoom('clientUpdateBall', data);
	}

}

module.exports = SocketUtil;