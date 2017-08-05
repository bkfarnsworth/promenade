import React from 'react';
import SocketMixin from './SocketMixin';
import './Scattergories.css';
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
         <div className="scattergories-container">
            <div className="time-remaining">Time Remaining: {this.state.timeRemaining}</div>
            <div className="scattergories-letter">{this.gameProps.letter}</div>
            <br/>
            <br/>
            <div><b>List</b></div>
            <ol>
            {this.gameProps.list.map(category => {
               return <li>{category}</li>
            })}
            </ol>
            {this.state.timeRemaining <= 0 
               ? <button onClick={this.onPlayAgainClick.bind(this)} className="bf-button game-config-button-vertical boggle-play-again-button">Play Again</button>
               : null
            }
         </div>
      )
   }
};

export default Scattergories;