import React from 'react';
import SocketMixin from './SocketMixin';
import './Trivia.css';

class Trivia extends React.Component  {

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
            Trivia
         </div>
      )
   }
};

export default Trivia;