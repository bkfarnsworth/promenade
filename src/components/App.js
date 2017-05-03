import React from 'react';
import PropTypes from 'prop-types';
import GameMenu from './GameMenu';
import Boggle from './Boggle';
import _ from 'lodash';
import IO from 'socket.io-client'
import Room from './Room';
import { HashRouter, Switch, Route, Link } from 'react-router-dom'

import './App.css';




const Waiting = () => {
   return <div>WAITING<Link to={'/boggle'}>Play Game</Link></div>;
}

class App extends React.Component  {

   get games() {
      return [
         {
            name: 'Boggle',
            getGameComponent: () => <Boggle/>,
            initialState: 'room'
         },
         {
            name: 'Pong',
            getGameComponent: () => <ComingSoon/>
         },
         {
            name: 'Trivia',
            getGameComponent: () => <ComingSoon/>
         },
         {
            name: 'Hungry Hungry Hippos',
            getGameComponent: () => <ComingSoon/>
         }
      ];
   }

   getGameMenu() {
      return <GameMenu games={this.games} />;
   }

   render() {
      return (
         <HashRouter>
           <Switch>
             <Route exact path='/' component={this.getGameMenu.bind(this)}/>
             <Route exact path='/room' component={Room} />
             <Route exact path='/waiting' component={Waiting} />
             {this.games.map(game => {
               return <Route key={game.name} path={'/' + game.name} component={game.getGameComponent} />
             })}
           </Switch>
         </HashRouter>          
      )
   }

}

const ComingSoon = () => {
   return <div>Coming soon</div>;
}

export default App;
