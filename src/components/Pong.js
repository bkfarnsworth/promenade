import React from 'react';
import $ from 'jquery';
import KeyCodes from './../KeyCodes'
import SocketMixin from './SocketMixin';
import Phaser from 'phaser';
import PhaserPong from './PhaserPong';


class Pong extends React.Component  {

   constructor(props) {
      super(props)
      Object.assign(this, SocketMixin);
      Object.assign(this, props);
      Object.assign(this, _.get(props, 'location.state', {}));
   }

   componentDidMount() {
   	let pong = new PhaserPong();

   	console.log('pong: ', pong);
   }

   componentWillUnmount() {
      this.callOffFuncs();
   }

	render() {
		return (
			<div id="gameDiv">
			</div>
		)
	}
};

export default Pong;