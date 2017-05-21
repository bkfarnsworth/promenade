import React from 'react';
import $ from 'jquery';
import KeyCodes from './../KeyCodes'


class Pong extends React.Component  {

   componentDidMount() {

      $(window).on('keydown', (e) => {

         let $div = $('#pong-current-player')

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

      });

      //socket.on update
         //move the other player


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
			<div id="pong-current-player" style={p1Styles}>
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