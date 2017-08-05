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

         // if(timeRemaining === 0) {
         //    this.submitResults();
         // }
      });


      console.log('this: ', this);
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
         </div>
      )
   }
};

export default Scattergories;