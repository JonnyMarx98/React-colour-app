import React, { Component, useState, useEffect } from 'react';
import {Link} from 'react-router-dom';
import clsx from 'clsx';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button'
import MenuIcon from '@material-ui/icons/Menu';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';


export default function PaletteFormNav(props) {
  const { classes, open, handleDrawerOpen, handleSubmit, newNames, handleChange } = props;
  return (
    <div>
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
          
          <ValidatorForm onSubmit={handleSubmit}>
            <TextValidator 
            label="Palette Name"
            value={newNames.palette}
            onChange={handleChange}
            name='palette'
            validators={["required", "isPaletteNameUnique"]}
            errorMessages={["Enter Palette Name!", "Name already taken"]} 
            />
          <Button variant="contained" color="primary" type="submit">
            Save Palette
          </Button>
          <Link to="/">
            <Button variant="contained" color="secondary">Go Back</Button>
          </Link>
          </ValidatorForm>
        </Toolbar>
      </AppBar>
    </div>
  )
}
