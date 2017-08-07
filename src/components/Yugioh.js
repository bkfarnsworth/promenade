import React from 'react';
import SocketMixin from './SocketMixin';
// import './Scattergories.css';
import DebugHelper from './../DebugHelper';



//playerArea
   //deck
   //monster zone
   //spell trap zone
   //graveyard
   //out of play
   //field spell

   //hand for each player


// const PlayerArea = (deck, player) => {
//    if(player type is opponent) {
//       return (
//          <div>
//             <div>
//                <Deck/>
//                <SpellTrapRow/>
//             </div>
//             <div>
//                <Graveyard/>
//                <MonsterRow/>
//             </div>
//          </div>
//       );
//    } else if(player type is this player) {
//       return (
//          <div>
//             <div>
//                <MonsterRow/>
//                <Graveyard/>
//             </div>
//             <div>
//                <SpellTrapRow/>
//                <Deck/>
//             </div>
//             <div>
//                <Hand/>
//             </div>
//          </div>
//       );
//    }
// }



class Yugioh extends React.Component  {

   constructor(props) {
      super(props)
      Object.assign(this, SocketMixin);
      Object.assign(this, props);
      Object.assign(this, _.get(props, 'location.state', {}));
      this.state = {}
   }

   componentDidMount() {

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

   createLink(card) {
      var cardString = card.name.trim().split(' ').map(function(word) {
         return word.charAt(0).toUpperCase() + word.slice(1).toLowerCase();
      }).join('_');
      return 'http://static.api3.studiobebop.net/ygo_data/card_images/' + cardString + '.jpg';
   }

   render() {
      return (
         <div className="scattergories-container">
            {this.gameProps.deck.map(card => {
               return (
                  <div>
                     <div><b>{card.name}</b></div>
                     <div>{card.desc}</div>
                     <img src={this.createLink(card)}/>
                  </div>
               )
            })}
         </div>
      )
   }

   // render() {
   //    return (
   //       <div className="scattergories-container">
   //          {this.gameProps.deck.map(card => {
   //             return (
   //                <div>
   //                   <PlayerArea deck={deck}/>
   //                   <PlayerArea deck={deck}/>
   //                </div>
   //             )
   //          })}
   //       </div>
   //    )
   // }
};

export default Yugioh;