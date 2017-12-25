import React from 'react';
import PropTypes from 'prop-types';
import AppConfig from './../AppConfig';
import SocketMixin from './SocketMixin';
import DebugHelper from './../DebugHelper';
import './CodeNames.css';
import _ from 'lodash';
// import $ from 'jquery';
import Grid from './Grid';

class CodeNames extends React.Component  {

   constructor(props) {
      super(props)
      Object.assign(this, SocketMixin);
      Object.assign(this, props);
      Object.assign(this, _.get(props, 'location.state', {}));
      Object.assign(this, _.get(props, 'location.state.gameProps', {}));

      //TODO: just for debugging
      // this.userName = 'rose'
      // this.players = ['brian', 'rose', 'tam'];
      // this.board = DebugHelper.getCodeNamesBoard();

      //start off in config state
      this.state = {
         needsConfig: true,
         board: this.board
      }
   }

   componentDidMount() {
      this.onSocketEvent('boardChanged', (data) => {
         this.setState({
            board: data.board
         });
      });

      this.onSocketEvent('configFinished', (data) => {

         this.codeNamesPlayers = data.codeNamesPlayers;
         this.setState({
            needsConfig: false
         });
      })
   }

   componentWillUnmount() {
      this.callOffFuncs();
   }

   get codeNamesPlayer() {
      if(!this._codeNamesPlayer) {
         this._codeNamesPlayer = this.codeNamesPlayers.find(p => p.name === this.userName);
      }
      return this._codeNamesPlayer;
   }  

   onConfigFinish(codeNamesPlayers) {
      this.codeNamesPlayers = codeNamesPlayers;
      this.socket.emit('configFinished', codeNamesPlayers);
   	this.setState({
   		needsConfig: false
   	});
   }

   onCellClick(cell) {
      cell.discovered = true;
      this.socket.emit('boardChanged', this.state.board);
      this.setState({});
   }

   render() {

		let {needsConfig, board} = this.state;

		if(needsConfig) {
         if(this.playerType === 'host') {
            return <ConfigView players={this.players} onFinish={this.onConfigFinish.bind(this)}/>
         } else {
            return <div>Waiting for config</div>
         }
		} else {
			return (
				<div className="code-names">
					<Board 
                  board={board} 
                  isSpyMaster={this.codeNamesPlayer.isSpyMaster} 
                  onCellClick={this.onCellClick.bind(this)}
               />
				</div>
			)
		}
	}
};


const ConfigView = (props) => {

	let {
		players
	} = props;

   let codeNamesPlayers = players.map(p => {
      return {
         name: p,
         isSpyMaster: false,
         team: ''
      }
   });

	return (
		<div>
			{codeNamesPlayers.map(p => {
				return (
					<div>
						{p.name}
						Spymaster: <input type="checkbox" onChange={(e) => p.isSpyMaster = e.target.checked}/>
					</div>
				)
			})}
			<button onClick={() => props.onFinish(codeNamesPlayers)}>Done</button>
		</div>
	)
}

const BoardMap = (props) => {
   let {board} = props;

   let cellContents = (cellContentProps) => {
      let {cell} = cellContentProps;
      return (
         <div> 
            {cell.team}
         </div>
      );
   }

   return <Grid grid={board} cellContents={cellContents}/>
}

const Board = (props) => {
   let {board, isSpyMaster} = props;


   let cellContents = (cellContentProps) => {
      let {cell} = cellContentProps;

      let colorMap = {
         red: 'red',
         blue: 'blue',
         neutral: 'tan',
         assassin: 'black'
      }

      let shouldDisplayBackgroundColor = isSpyMaster || cell.discovered;
      let style = {
         backgroundColor: shouldDisplayBackgroundColor ? colorMap[cell.team] : 'initial'
      }

      return (
      	<div className="cell-contents" style={style}>
            {
               cell.discovered 
               ? <div></div>
               : <div>{cell.word}</div>
            }
      	</div>
      );
   }

   return <Grid grid={board} cellContents={cellContents} onCellClick={props.onCellClick}/>
}

export default CodeNames;
