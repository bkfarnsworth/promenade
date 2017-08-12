import React from 'react';
import SocketMixin from './SocketMixin';
// import './Scattergories.css';
import DebugHelper from './../DebugHelper';


class ConnectFour extends React.Component  {

   constructor(props) {
      super(props)
      Object.assign(this, SocketMixin);
      Object.assign(this, props);
      Object.assign(this, _.get(props, 'location.state', {}));
      this.state = {}
   }

   onPlayAgainClick() {
      let {userName, roomCode, playerType, game} = this;
      let eventToEmit = playerType === 'host' ? 'hostRoom' : 'joinRoom';
      this.socket.emit(eventToEmit, {roomCode, userName}, () => {
         this.props.history.push({
            pathname: '/waiting',
            state: {playerType, roomCode, userName, game}
         });
      });
   }

   componentWillUnmount() {
      this.callOffFuncs();
   }

   render() {
      return (
         <div>
            CONNECT FOUR
         </div>
      )
   }

};

export default ConnectFour;