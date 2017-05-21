import React from 'react';
import $ from 'jquery';
import KeyCodes from './../KeyCodes'
import SocketMixin from './SocketMixin';



class Pong extends React.Component  {

   constructor(props) {
      super(props)
      Object.assign(this, SocketMixin);
   }

   componentDidMount() {

      $(window).on('keydown', (e) => {

         let $div = $('#pong-player-1')

         if(KeyCodes.fromEvent(e) === 'UP_ARROW') {
            $div.css('top', (i, v) => {
               return (parseFloat(v) - 10) + 'px';
            })
         }else if(KeyCodes.fromEvent(e) === 'LEFT_ARROW') {
            $div.css('left', (i, v) => {
               return (parseFloat(v) - 10) + 'px';
            })
         }else if(KeyCodes.fromEvent(e) === 'RIGHT_ARROW') {
            $div.css('left', (i, v) => {
               return (parseFloat(v) + 10) + 'px';
            })
         }else if(KeyCodes.fromEvent(e) === 'DOWN_ARROW') {
            $div.css('top', (i, v) => {
               return (parseFloat(v) + 10) + 'px';
            })
         }

         //emit an update to the room
         this.emitPositionUpdate({
            top: $div.css('top'),
            left: $div.css('left')
         })

      });

      this.onSocketEvent('positionUpdate', (data) => {
         let $div = $('#pong-player-2');
         $div.css(data)
      });
   }

   emitPositionUpdate(data) {
      this.socket.emit('positionUpdate', data);
   }

   componentWillUnmount() {
      this.callOffFuncs();
   }

	render() {

      let p1Styles = {
         position: 'absolute',
         top: 0
      }

      let p2Styles = {
         position: 'absolute',
         top: '20px'
      }

		return (
         <div>
			<div id="pong-player-1" style={p1Styles}>
				Me
			</div>
         <div id="pong-player-2" style={p2Styles}>
            Other Player
         </div>
         </div>
		)
	}
};

export default Pong;