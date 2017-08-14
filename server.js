const path = require('path');
const express = require('express');
const app = express();
const socketIO = require('socket.io');
const PORT = process.env.PORT || 8080;
const SocketServer = require('./server-src/SocketServer.js');
const AppConfig = require('./server-src/AppConfig.js');

app.use(express.static(path.join(__dirname, 'dist')));

app.get('/', function(request, response) {
	response.sendFile(__dirname + '/dist/index.html');
});

const server = app.listen(PORT, error => {
  error
  ? console.error(error)
  : console.info(`==>  Listening on port ${PORT}. Visit http://localhost:${PORT}/ in your browser.`)
});

const io = socketIO(server);
var appConfig = new AppConfig();
var socketServer = new SocketServer(io, appConfig);
socketServer.listen();


