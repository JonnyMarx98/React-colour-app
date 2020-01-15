import React, { Component } from 'react'
import ColorBox from './ColorBox';

class SinglePalette extends Component {
  constructor(props) {
    super(props)
  
    // this.state = {

    // }
    this._shades = this.getShades(this.props.palette, this.props.colorId);
    console.log(this._shades);
  }
  getShades(palette, colorToFind){
    let shades = [];
    let allColors = palette.colors;
    for(let key in allColors){
      shades = shades.concat(
        allColors[key].filter(color => color.id === colorToFind)
      )
    }
    return shades.slice(1);
  }

  render() {
    const colorBoxes = this._shades.map(color => (
      <ColorBox
        key={color.id}
        name={color.name}
        background={color.hex}
        showLink={false}
      />
    ))
    return (
      <div className="Palette">
        <h1>Single Color Palette</h1>
        <div className="Palette-colors">
          {colorBoxes}
        </div>
      </div>
    )
  }
}

export default SinglePalette;