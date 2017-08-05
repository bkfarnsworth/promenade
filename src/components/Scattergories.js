import React from 'react';
import SocketMixin from './SocketMixin';
// import './Trivia.css';
import DebugHelper from './../DebugHelper';

class Scattergories extends React.Component  {

   constructor(props) {
      super(props)
      Object.assign(this, SocketMixin);
      Object.assign(this, props);
      Object.assign(this, _.get(props, 'location.state', {}));
      this.state = {}
   }

   componentDidMount() {
      this.onSocketEvent('timeRemainingUpdate', (timeRemaining) => {
         this.setState({
            timeRemaining
         });
      });
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
            <div>Timer</div>
            <div className="time-remaining">Time Remaining: {this.state.timeRemaining}</div>
            <div>Letter</div>
            {this.gameProps.letter}
            <div>List</div>
            {this.gameProps.list.map(category => {
               return <div>{category}</div>
            })}
            {this.state.timeRemaining <= 0 
               ? <button onClick={this.onPlayAgainClick.bind(this)} className="bf-button game-config-button-vertical boggle-play-again-button">Play Again</button>
               : null
            }
         </div>
      )
   }
};

export default Scattergories;