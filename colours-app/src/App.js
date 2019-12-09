import React from 'react';
import Palette from './Palette';
import seedColors from './seedColors';
// import './App.css';

function App() {
  return (
    <div className="App">
      <Palette {...seedColors[3]}/>
    </div>
  );
}

export default App;
