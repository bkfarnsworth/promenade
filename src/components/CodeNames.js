import React from 'react';
import PropTypes from 'prop-types';
import AppConfig from './../AppConfig';
import SocketMixin from './SocketMixin';
import DebugHelper from './../DebugHelper';
// import './Boggle.css';
import _ from 'lodash';
// import $ from 'jquery';

class CodeNames extends React.Component  {

   constructor(props) {
      super(props)
      Object.assign(this, SocketMixin);
      Object.assign(this, props);
      Object.assign(this, _.get(props, 'location.state', {}));
      Object.assign(this, _.get(props, 'location.state.gameProps', {}));
   }

   componentWillUnmount() {
      this.callOffFuncs();
   }

   render() {
      return (
         <div>
            Code Names
         </div>
      )
   }
};

export default CodeNames;
