const _ = require('lodash');
const Game = require('./Game.js');

class SocketUtil {

  constructor(socket, io, appConfig) {
    this.socket = socket;
    this.io = io;
    this.appConfig = appConfig;
  }

  get roomName() {
    return _.get(this, 'game.roomName');
  }

  joinRoom(roomName, userName, cb) {
    //join the room
    this.socket.join(roomName);

    //save the username
    this.userName = userName;

    //get the game
    this.appConfig.gameMap[roomName] = this.appConfig.gameMap[roomName] || new Game(this.io, roomName);
    this.game = this.appConfig.gameMap[roomName]

    //add the username to the map
    this.game.socketUsernameMap[this.socket.id] = userName;

    //callback
    cb()

    //emit to all members that there is a new member
    this.getUsernamesForRoom((names) => {
      this.emitToRoom('newRoomMember', {roomMembers: names})
    })
  }

  getUsernamesForRoom(cb) {
    this.io.in(this.roomName).clients((error, clients) => {
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
    this.io.in(this.roomName).emit(name, data);
  }

  startGame() {
    this.game.start();
  }

  submitResults(data) {
    this.game.addResult(this.userName, data.words);

    let finalResults = this.game.getFinalResults();
    let solution = this.game.solution;
    this.getRoomMembers(data => {

      let members = data.roomMembers;
      if(finalResults.length === members.length) {
        this.emitToRoom('finalResults', {
          finalResults,
          solution
        })
      }
    });
  }

}

module.exports = SocketUtil;