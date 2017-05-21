import React from 'react';
import $ from 'jquery';
import KeyCodes from './../KeyCodes'
import SocketMixin from './SocketMixin';



class Pong extends React.Component  {

   constructor(props) {
      super(props)
      Object.assign(this, SocketMixin);
      Object.assign(this, props);
      Object.assign(this, _.get(props, 'location.state', {}));
   }

   componentDidMount() {

      $(window).on('keydown', (e) => {

         var $div = $(`div[data-player-id="${this.userName}"]`)

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
         var $div = $(`div[data-player-id="${data.playerId}"]`)
         $div.css(data)
      });
   }

   emitPositionUpdate(data) {
      this.socket.emit('positionUpdate', data);
   }

   componentWillUnmount() {
      this.callOffFuncs();
   }

   onUpClick() {
      var $div = $(`div[data-player-id="${this.userName}"]`)
      $div.css('top', (i, v) => {
         return (parseFloat(v) - 10) + 'px';
      })
      //emit an update to the room
      this.emitPositionUpdate({
         top: $div.css('top'),
         left: $div.css('left')
      })
   }

   onDownClick() {
      var $div = $(`div[data-player-id="${this.userName}"]`)
      $div.css('top', (i, v) => {
         return (parseFloat(v) + 10) + 'px';
      })
      //emit an update to the room
      this.emitPositionUpdate({
         top: $div.css('top'),
         left: $div.css('left')
      })
   }

   onRightClick() {
      var $div = $(`div[data-player-id="${this.userName}"]`)
      $div.css('left', (i, v) => {
         return (parseFloat(v) + 10) + 'px';
      })
      //emit an update to the room
      this.emitPositionUpdate({
         top: $div.css('top'),
         left: $div.css('left')
      })
   }

   onLeftClick() {
      var $div = $(`div[data-player-id="${this.userName}"]`)
      $div.css('left', (i, v) => {
         return (parseFloat(v) - 10) + 'px';
      })
      //emit an update to the room
      this.emitPositionUpdate({
         top: $div.css('top'),
         left: $div.css('left')
      })
   }

	render() {
		return (
         <div>
            <div onClick={this.onUpClick.bind(this)}>UP</div>
            <div onClick={this.onDownClick.bind(this)}>DOWN</div>
            <div onClick={this.onRightClick.bind(this)}>RIGHT</div>
            <div onClick={this.onLeftClick.bind(this)}>LEFT</div>
            {this.players.map((p, pi) => {
               let style = {position: 'absolute', top: pi*20};
               return <div data-player-id={p} style={style}>{p}</div>               
            })}
         </div>
		)
	}
};

export default Pong;