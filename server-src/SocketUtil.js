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

    //join the room
    this.socket.join(roomCode);

    //save the username
    this.userName = userName;

    //get the game
    this.appConfig.gameMap[roomCode] = this.appConfig.gameMap[roomCode] || new Game(this.io, roomCode);
    this.game = this.appConfig.gameMap[roomCode]

    //add the username to the map
    this.game.socketUsernameMap[this.socket.id] = userName;

    //callback
    cb(roomCode);

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

  emitToRoom(name, data) {
    this.io.in(this.roomCode).emit(name, data);
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

}

module.exports = SocketUtil;