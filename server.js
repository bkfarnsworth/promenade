const path = require('path');
const express = require('express');
const app = express();
const socketIO = require('socket.io');
const PORT = process.env.PORT || 8080;
const _ = require('lodash');
const SocketUtil = require('./server-src/SocketUtil.js');


app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', function(request, response) {
  response.sendFile(__dirname + '/dist/index.html');
});

const server = app.listen(PORT, error => {
  error
  ? console.error(error)
  : console.info(`==> 🌎 Listening on port ${PORT}. Visit http://localhost:${PORT}/ in your browser.`)
});

const io = socketIO(server);
class AppConfig {
  constructor() {
    this.gameMap = {};
  }
}
var appConfig = new AppConfig();

console.log('appConfig: ', appConfig);

io.on('connection', (socket) => {
  console.log('Client connected');
  let socketUtil = new SocketUtil(socket, io, appConfig);
  socket.on('joinRoom', socketUtil.joinRoom.bind(socketUtil));
  socket.on('getRoomMembers', socketUtil.getRoomMembers.bind(socketUtil));
  socket.on('startGame', socketUtil.startGame.bind(socketUtil));
  socket.on('disconnect', () => console.log('Client disconnected'));
});