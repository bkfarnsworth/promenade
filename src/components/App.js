import React from 'react';
import PropTypes from 'prop-types';

import '../assets/stylesheets/base.scss';


const arr = [
{name: 'Brian'},
{name: 'Rose'},
{name: 'Miles'},
{name: 'Tam'},
{name: 'Grace'},
{name: 'Dad'},
{name: 'Mom'},
{name: 'Jimmy'},
{name: 'Scotty'},
{name: 'Ruby'},
{name: 'Brian'}
]

const App = ({ name }) => {
  return (
   <div>
      {arr.map(el => <div>{el.name}</div>)}
   </div>
   )
};

App.propTypes = {
  name: PropTypes.string,
};

export default App;
