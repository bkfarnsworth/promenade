import React from 'react';
import $ from 'jquery';
import KeyCodes from './../KeyCodes'
import SocketMixin from './SocketMixin';
// import PhaserPong from './PhaserPong';
import './Pong.css';



class Pong extends React.Component  {

   // constructor(props) {
   //    super(props)
   //    Object.assign(this, SocketMixin);
   //    Object.assign(this, props);
   //    Object.assign(this, _.get(props, 'location.state', {}));
   // }

   // componentDidMount() {
   // 	let pong = new PhaserPong(this.socket, {
   //       hosting: this.playerType === 'host', 
   //       playersCount: this.players.length,
   //       playerNum: this.players.indexOf(this.userName)
   //    });
   // }

   // componentWillUnmount() {
   //    this.callOffFuncs();
   // }

	render() {
		return (
			<div className="pong-container">
				<div id="game">
				</div>
			</div>
		)
	}
};

export default Pong;