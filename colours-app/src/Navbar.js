import React, { Component } from 'react';
import {Link} from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import Snackbar from '@material-ui/core/Snackbar';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slider from 'rc-slider';

import styles from './styles/NavbarStyles'
import 'rc-slider/assets/index.css';



class Navbar extends Component {

  constructor(props) {
    super(props)
  
    this.state = {
       format: 'hex',
       snackOpen: false
    }
    this.handleFormatChange = this.handleFormatChange.bind(this);
    this.closeSnackbar = this.closeSnackbar.bind(this);
  }
  
  closeSnackbar(){
    this.setState({snackOpen: false});
  }

  handleFormatChange(e){
    this.setState({ format: e.target.value, snackOpen: true });
    this.props.handleFormatChange(e.target.value);
  }

  render() {
    const {level, changeLevel, singleColor, classes} = this.props;
    const {format, snackOpen} = this.state;
    return (
      <header className={classes.Navbar}>
        <div className={classes.logo}>
          <Link to='/'>reactcolorpicker</Link>
        </div>
        {!(singleColor) && <div>
          <span>Level: {level}</span>
          <div className={classes.slider}>
            <Slider 
              defaultValue={level} 
              min={100} 
              max={900}
              step={100}
              onAfterChange={changeLevel}
            />
            </div>
        </div> }
        <div className={classes.selectContainer}>
          <Select value={format} onChange={this.handleFormatChange}>
            <MenuItem value="hex">HEX - #ffffff</MenuItem>
            <MenuItem value="rgb">RGB - rgb(255, 255, 255)</MenuItem>
            <MenuItem value="rgba">RGBA - rgba(255, 255, 255, 1.0)</MenuItem>
          </Select>
        </div>
        <Snackbar
          anchorOrigin={{vertical: "bottom", horizontal: "left"}}
          open={snackOpen}
          autoHideDuration={3000}
          message={<span id="message-id">Format Changed to {format.toUpperCase()}</span>}
          ContentProps={{
            "aria-describedby": "message-id"
          }}
          onClose={this.closeSnackbar}
          action={[
            <IconButton
              onClick={this.closeSnackbar}
              color='inherit'
              key='close'
            >
              <CloseIcon />
            </IconButton>
          ]}  
        ></Snackbar>
      </header>
    )
  }
}

export default withStyles(styles)(Navbar);
