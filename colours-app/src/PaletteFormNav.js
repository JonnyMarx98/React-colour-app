import React, { Component, useState, useEffect } from 'react';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import {Link} from 'react-router-dom';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button'
import MenuIcon from '@material-ui/icons/Menu';
import PaletteMetaForm from './PaletteMetaForm';
import useStyles from './styles/PaletteFormNavStyles';

export default function PaletteFormNav(props) {
  const { open, handleDrawerOpen, handleSubmit, newNames, handleChange } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [formShowing, setFormShowing] = useState(false);

  const showForm = () => {
    setFormShowing(true);
  }
  const hideForm = () => {
    setFormShowing(false);
  }
  
  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position="fixed"
        color="default"
        className={clsx(classes.appBar, {
          [classes.appBarShift]: open,
        })}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            onClick={handleDrawerOpen}
            edge="start"
            className={clsx(classes.menuButton, open && classes.hide)}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap>
            Create A Palette
          </Typography>
        </Toolbar>
        <div className={classes.navBtns}>
            <Link to="/">
              <Button variant="contained" color="secondary" className={classes.button}>Go Back</Button>
            </Link>
            <Button variant="contained" color="primary" onClick={showForm} className={classes.button}>
              Save Palette
            </Button>
          </div>
      </AppBar>

      {formShowing && <PaletteMetaForm
        handleChange={handleChange}
        newNames={newNames}
        handleSubmit={handleSubmit}
        hideForm={hideForm}
      />}
    </div>
  )
}
