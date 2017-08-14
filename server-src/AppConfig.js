const Boggle = require('./Boggle.js');
const Scattergories = require('./Scattergories.js');
const Yugioh = require('./Yugioh.js');
const ConnectFour = require('./ConnectFour.js');
const _ = require('lodash');

class AppConfig {

	constructor() {
		this.gameMap = {};
	}

	createNewGame(opts) {
		let {gameName, roomCode, socketWrapper, userName, io} = opts;
		let game;

		if(gameName === 'Boggle') {
			game = new Boggle(io, roomCode);
		} else if(gameName === 'Scattergories') {
			game = new Scattergories(io, roomCode);
		} else if(gameName === 'Yugioh') {
			game = new Yugioh(io, roomCode);
		} else if(gameName === 'ConnectFour') {
			game = new ConnectFour(io, roomCode);
		}

		return game;
	}

	createGameIfNotCached(opts={}) {

		_.defaults(opts, {
			roomCode: 'default required',
			userName: 'default userName',
			gameName: 'gameName required',
			socketWrapper: undefined
		});
		let {gameName, roomCode, socketWrapper, userName, io} = opts;

		//create the game or get it from the cache. then assign to the gameMap
		let game = this.gameMap[roomCode] || this.createNewGame(opts);
		this.gameMap[roomCode] = game;

		//we are going to have a bidirectional caching thing going on
		socketWrapper.game = game;
		game.socketWrappers.add(socketWrapper);

		return game;
	}

	get games() {
		return Object.values(this.gameMap);
	}

}

module.exports = AppConfig;