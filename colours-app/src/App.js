import React, { Component } from 'react';
import Palette from './Palette';
import seedColors from './seedColors';
import {generatePalette} from './colorHelpers';

// import './App.css';

class App extends Component{
  render() {
    console.log(generatePalette(seedColors[2]));
  return (
    <div className="App">
      <Palette {...seedColors[3]}/>
    </div>
    );
  }
  
}

export default App;
