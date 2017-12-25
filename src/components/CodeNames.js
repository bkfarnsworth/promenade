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

      //map the strings to objects to store more data
      this.codeNamesPlayers = this.players.map(p => {
      	return {
      		name: p,
      		isSpyMaster: false,
      		team: ''
      	}
      });

      //find the player for this user's client
      this.codeNamePlayer = this.codeNamesPlayers.find(p => p.name === this.userName);

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
   }

   componentWillUnmount() {
      this.callOffFuncs();
   }

   onConfigFinish() {
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
		   return <ConfigView players={this.codeNamesPlayers} onFinish={this.onConfigFinish.bind(this)}/>
		} else {
			return (
				<div className="code-names">
					{this.codeNamesPlayers.map(p => {
						return <div>{p.name} {p.isSpyMaster? 'true' : 'false'}</div>
					})}
					<Board board={board} isSpyMaster={this.codeNamePlayer.isSpyMaster} onCellClick={this.onCellClick.bind(this)}/>
				</div>
			)
		}
	}
};


const ConfigView = (props) => {

	let {
		players
	} = props;

	return (
		<div>
			{players.map(p => {
				return (
					<div>
						{p.name}
						Spymaster: <input type="checkbox" onChange={(e) => p.isSpyMaster = e.target.checked}/>
					</div>
				)
			})}
			<button onClick={() => props.onFinish()}>Done</button>
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
