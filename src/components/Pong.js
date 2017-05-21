import React from 'react';
import $ from 'jquery';
import KeyCodes from './../KeyCodes'


class Pong extends React.Component  {

   componentDidMount() {

      $(window).on('keydown', (e) => {

         let $div = $('#pong-div')

         if(KeyCodes.fromEvent(e) === 'UP_ARROW') {
            $div.css('marginTop', (i, v) => {
               return (parseFloat(v) - 10) + 'px';
            })
         }else if(KeyCodes.fromEvent(e) === 'LEFT_ARROW') {
            $div.css('marginLeft', (i, v) => {
               return (parseFloat(v) - 10) + 'px';
            })
         }else if(KeyCodes.fromEvent(e) === 'RIGHT_ARROW') {
            $div.css('marginLeft', (i, v) => {
               return (parseFloat(v) + 10) + 'px';
            })
         }else if(KeyCodes.fromEvent(e) === 'DOWN_ARROW') {
            $div.css('marginTop', (i, v) => {
               return (parseFloat(v) + 10) + 'px';
            })
         }
      });
   }



	render() {
		return (
			<div id="pong-div">
				Pong
			</div>
		)
	}
};

export default Pong;