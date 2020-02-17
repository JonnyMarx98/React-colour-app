import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import {generatePalette} from './colorHelpers';
import Palette from './Palette';
import SinglePalette from './SinglePalette';
import PaletteList from './PaletteList';
import seedColors from './seedColors';
import NewPaletteForm from './NewPaletteForm';


// import './App.css';

class App extends Component{
  constructor(props) {
    super(props);
    const savedPalettes = JSON.parse(window.localStorage.getItem("palettes"));
    this.state = {palettes: savedPalettes || seedColors};
    this.savePalette = this.savePalette.bind(this);
    this.findPalette = this.findPalette.bind(this);
  }
  

  findPalette(id){
    return this.state.palettes.find(function(palette){
      return palette.id === id;
    })
  }

  savePalette(newPalette) {
    console.log(newPalette);
    this.setState({palettes: [...this.state.palettes, newPalette]}, 
    this.syncLocalStorage
    );
  }

  syncLocalStorage() {
    // save palettes to local storage
    window.localStorage.setItem(
      "palettes",
      JSON.stringify(this.state.palettes)
    )
  }

  render() {
  return (
    <Switch>
      <Route 
        exact
        path="/palette/new"
        render={(routeProps) => <NewPaletteForm savePalette={this.savePalette} palettes={this.state.palettes} {...routeProps}/>}
      />
      <Route 
        exact
        path="/"
        render={(routeProps) => <PaletteList palettes={this.state.palettes} {...routeProps}/>}
      />
      <Route
        exact
        path='/palette/:id'
        render={routeProps => <Palette 
          palette={generatePalette(this.findPalette(routeProps.match.params.id))}/>} 
      />
      <Route
        path="/palette/:paletteId/:colorId"
        render={routeProps => (
        <SinglePalette
          colorId={routeProps.match.params.colorId}
          palette={generatePalette(this.findPalette(routeProps.match.params.paletteId))}/>
        )} 
      />
    </Switch>
    
    // <div className="App">
    //   <Palette palette={generatePalette(seedColors[4])}/>
    // </div>
    );
  }
  
}

export default App;
