import React from 'react';
import SocketMixin from './SocketMixin';
import './ConnectFour.css';
import DebugHelper from './../DebugHelper';
import Grid from './Grid';


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

      let board = {
         columns: [
            {
               cells: [
                  {color1: 'blue', color2: 'yellow'},
                  {},
                  {},
                  {}
               ]
            },
            {cells: [{color1: 'pink'},{},{},{}]},
            {cells: [{},{},{},{}]},
            {cells: [{},{},{},{}]},
            {cells: [{},{},{},{}]},
         ]
      }



      return (
         <div>
            <Grid grid={board} cellContents={CellContents}/>
         </div>
      )
   }

};

const CellContents = props => {
   let {cell} = props;
   return (
      <div>{cell.color1}</div>
   );
}

export default ConnectFour;