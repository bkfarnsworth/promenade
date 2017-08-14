const SocketWrapper = require('./SocketWrapper.js');
const hri = require('human-readable-ids').hri
const _ = require('lodash');

class SocketServer {

   constructor(io, appConfig) {
      this.io = io;
      this.appConfig = appConfig;
   }

   listen() {
      this.io.on('socketWrapper', (socket) => {

         console.log('Client connected');

         let socketWrapper = new SocketWrapper(socket);
         socket.on('joinRoom',       (opts, cb) => this.joinRoom(socketWrapper, opts, cb));
         socket.on('hostRoom',       (opts, cb) => this.hostRoom(socketWrapper, opts, cb));
         socket.on('leaveRoom',      ()         => this.leaveRoom(socketWrapper));
         socket.on('getRoomMembers', (cb)       => this.getRoomMembers(socketWrapper, cb));
         socket.on('startGame',      ()         => this.startGame(socketWrapper));
         socket.on('disconnect',     ()         => console.log('Client disconnected'));

         //boggle
         socket.on('submitResults',  (data) => this.submitResults(socketWrapper, data));

         //pong
         // socket.on('gameUpdate', socketWrapper.gameUpdate.bind(socketWrapper));
         // socket.on('gameScores', socketWrapper.gameScores.bind(socketWrapper));
         // socket.on('gameBall', socketWrapper.gameBall.bind(socketWrapper));
      });
   }

   hostRoom(socketWrapper, opts, cb) {
      _.defaults(opts, {
         //allow someday them to be able to type in a custom room code
         roomCode: hri.random(), 
         userName: 'default userName',
         gameName: 'gameName required'
      });

      this.joinRoom(socketWrapper, opts, cb);
   }

   joinRoom(socketWrapper, opts, cb) {
      _.defaults(opts, {
         roomCode: undefined,
         userName: 'default userName',
         gameName: 'gameName required'
      });

      let {roomCode, userName, gameName} = opts;

      //process the roomCode (handle case sensitivity etc)
      let originalRoomCode = roomCode;
      roomCode = this.processRoomCode(roomCode);

      socketWrapper.joinRoom(roomCode, userName);

      //callback - send the original name so we can display the dasherized room name
      cb(originalRoomCode);

      //create the game if necessary
      let game = this.appConfig.createGameIfNotCached({
         roomCode,
         userName,
         gameName,
         socketWrapper,
         io: this.io
      });

      game.emitNewRoomMember();
   }

   startGame(socketWrapper) {
      socketWrapper.game.start();
   }

   leaveRoom(socketWrapper) {
      socketWrapper.leaveRoom();
   }

   getRoomMembers(socketWrapper, cb) {
      socketWrapper.game.getUsernamesForRoom((names) => {
         cb({roomMembers: names});
      });
   }

   submitResults(socketWrapper, data) {
      socketWrapper.game.submitResults(data, socketWrapper.userName);
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
}

module.exports = SocketServer;