import React from 'react';
import { withStyles } from '@material-ui/core/styles';

const styles = {
  main: {
    backgroundColor: "purple",
    border: "3px solid teal"
  },
  second: {
    backgroundColor: "pink",
    "& h1": {
      color: "white"
    }
  }
}

function MiniPalette(props){
  const {classes} = props;
  console.log(classes);
  return (
    <div className={classes.main}>
      <h1>MiniPalette</h1>
      <section className={classes.second}>
        <h1>MiniPalettoooo</h1>
      </section>
    </div>
  )
}

export default withStyles(styles)(MiniPalette);