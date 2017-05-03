import React from 'react';
import PropTypes from 'prop-types';
import GameMenu from './GameMenu';
import Boggle from './Boggle';
import _ from 'lodash';
import IO from 'socket.io-client'
import { HashRouter, Switch, Route } from 'react-router-dom'

import './App.css';


class App extends React.Component  {

   constructor() {
      super();
   }

   get games() {
      return [
         {
            name: 'Boggle',
            getComponent: () => <Boggle/>
         },
         {
            name: 'Pong',
            getComponent: () => <ComingSoon/>
         },
         {
            name: 'Trivia',
            getComponent: () => <ComingSoon/>
         },
         {
            name: 'Hungry Hungry Hippos',
            getComponent: () => <ComingSoon/>
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
             {this.games.map(game => {
               return <Route key={game.name} path={'/' + game.name} component={game.getComponent} />
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
