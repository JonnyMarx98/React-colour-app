import React, { Component } from 'react';
import MiniPalette from './MiniPalette';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import styles from './styles/PaletteListStyles';
import { CSSTransition, TransitionGroup } from 'react-transition-group';


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
          
            <TransitionGroup className={classes.palettes}>
              {palettes.map(palette => (
                <CSSTransition
                  key={palette.id}
                  classNames="fade"
                  timeout={500}
                >
                  <MiniPalette
                    {...palette}
                    handleClick={() => this.goToPalette(palette.id)}
                    handleDelete={deletePalette}
                    key={palette.id}
                    id={palette.id}  
                  />
                </CSSTransition>
              ))}
            </TransitionGroup>
          
        </div>
        
      </div>
    )
  }
}

export default withStyles(styles)(PaletteList);