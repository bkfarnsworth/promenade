import React from 'react';
import PropTypes from 'prop-types';
import GameMenu from './GameMenu';
import Boggle from './Boggle';
import _ from 'lodash';
import Room from './Room';
import Waiting from './Waiting';
import Results from './Results';
import { HashRouter, Switch, Route, Link } from 'react-router-dom'
import IO from 'socket.io-client'
import AppConfig from './../AppConfig'
import './App.css';


class App extends React.Component  {

   constructor(props) {
      super(props);
      AppConfig.socket = IO();
   }

   get games() {
      return [
         {
            name: 'Boggle',
            getGameComponent: (props) => <Boggle {...props}/>,
            initialState: 'room'
         },
         {
            name: 'Pong',
            getGameComponent: (props) => <ComingSoon {...props}/>
         },
         {
            name: 'Trivia',
            getGameComponent: (props) => <ComingSoon {...props}/>
         },
         {
            name: 'Hungry Hungry Hippos',
            getGameComponent: (props) => <ComingSoon {...props}/>
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
             <Route exact path='/results' component={Results} />
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
