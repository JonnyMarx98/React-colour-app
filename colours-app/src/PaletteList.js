import React, { Component } from 'react';
import MiniPalette from './MiniPalette';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles/PaletteListStyles'

class PaletteList extends Component {
  constructor(props) {
    super(props)
  
    this.state = {
       
    }

    // this.goToPalette = this.goToPalette.bind(this);
  }
  

  goToPalette(id){
    console.log("hi, go to pal");
    this.props.history.push(`/palette/${id}`)
  }

  render() {
    const {palettes, classes, deletePalette} = this.props;
    return (
      <div className={classes.root}>
        <div className={classes.container}>
          <nav className={classes.nav}>
          <h1 className={classes.heading}>REACT COLORS</h1>
          <Link to="/palette/new">Create New Palette</Link>
          </nav>
          <div className={classes.palettes}>
            {palettes.map(palette => (
              <MiniPalette
                {...palette}
                handleClick={() => this.goToPalette(palette.id)}
                handleDelete={deletePalette}
                key={palette.id}
                id={palette.id}  
              />
            ))}
          </div>
        </div>
        
      </div>
    )
  }
}

export default withStyles(styles)(PaletteList);