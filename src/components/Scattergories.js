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
   }

   componentWillUnmount() {
      this.callOffFuncs();
   }

   render() {
      return (
         <div>
            <div>Timer</div>
            <div>Letter</div>
            <div>List</div>
         </div>
      )
   }
};

export default Scattergories;