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
      this.state = {
         board: DebugHelper.getConnectFourBoard()
      }
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

   onCellClick(cell) {
      let column = this.state.board.columns.find(c => c.cells.includes(cell));
      let emptyCells = column.cells.filter(c => !c.color1);
      let lowestEmptyCell = _.last(emptyCells);
      lowestEmptyCell.color1 = 'brown';

      //I'm updating the model that's already being used in the render method, so no need to setState here
      this.forceUpdate();
   }

   render() {
      return (
         <div>
            <Grid grid={this.state.board} cellContents={CellContents} onCellClick={this.onCellClick.bind(this)}/>
         </div>
      )
   }

};

const CellContents = props => {
   let {cell} = props;
   let style = {
      backgroundColor: cell.color1
   }
   return (
      <div style={style} className="connect-four-disc"></div>
   );
}

export default ConnectFour;