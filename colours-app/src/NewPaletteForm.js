import React, { Component, useState, useEffect } from 'react';
import clsx from 'clsx';
import { makeStyles, useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button'
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import {ChromePicker} from 'react-color';
import DragColorList from './DragColorList';
import { arrayMove } from 'react-sortable-hoc';

const drawerWidth = 400;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  appBar: {
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    width: `calc(100% - ${drawerWidth}px)`,
    marginLeft: drawerWidth,
    transition: theme.transitions.create(['margin', 'width'], {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
  },
  drawerPaper: {
    width: drawerWidth,
  },
  drawerHeader: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(0, 1),
    ...theme.mixins.toolbar,
    justifyContent: 'flex-end',
  },
  content: {
    flexGrow: 1,
    height: "calc(100vh - 64px)",
    padding: theme.spacing(3),
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    marginLeft: -drawerWidth,
  },
  contentShift: {
    transition: theme.transitions.create('margin', {
      easing: theme.transitions.easing.easeOut,
      duration: theme.transitions.duration.enteringScreen,
    }),
    marginLeft: 0,
  },
}));

NewPaletteForm.defaultProps = {
  maxColors: 20
}

export default function NewPaletteForm(props){
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [currentColor, setCurrentColor] = useState("red");
  const [colors, setColors] = useState(props.palettes[0].colors);
  // const [newColorName, setNewColorName] = useState("");
  // const [newPaletteName, setNewPaletteName] = useState("");
  const [newNames, setNewNames] = useState({palette: '', color: ''})

  useEffect(() => {
    ValidatorForm.addValidationRule('isColorNameUnique', (value) => 
      colors.every(
        ({name}) => name.toLowerCase() !== value.toLowerCase()
      )
    );
    ValidatorForm.addValidationRule('isColorUnique', () => 
      colors.every(
        ({color}) => color !== currentColor
      )
    );
    ValidatorForm.addValidationRule('isPaletteNameUnique', (value) => 
      props.palettes.every(
        ({paletteName}) => paletteName.toLowerCase() !== value.toLowerCase()
      )
    );
  }, [newNames, currentColor])

  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const updateCurrentColor = (newColor) => {
    // console.log(newColor);
    setCurrentColor(newColor.hex)
  }

  const addNewColor = () => {
    const newColor = {
      color: currentColor, 
      name: newNames.color
    }
    setColors([...colors, newColor]);
    setNewNames({...newNames, color: ""});
  }

  const addRandomColor = () => {
    // Choose random palette
    var randP = Math.floor(Math.random()*props.palettes.length);
    const randPalette = props.palettes[randP];
    // Choose random color from that palette
    var randC = Math.floor(Math.random()*randPalette.colors.length);
    const randomColor = randPalette.colors[randC];
    setColors([...colors, randomColor]);
    setNewNames({...newNames, color: ""});
  }

  const handleChange = evt => {
    const {name, value} = evt.target;
    setNewNames({...newNames, [name]: value});
  }

  const handleSubmit = () => {
    let newName = newNames.palette;
    const newPalette = {
      paletteName: newName,
      id: newName.toLowerCase().replace(/ /g, "-"),
      colors: colors
    }
    props.savePalette(newPalette);
    props.history.push("/");
  }

  const removeColor = (colorName) => {
    setColors(colors.filter(color => color.name !== colorName));
  }

  const clearPalette = () => {
    setColors([]);
  }
  
  const onSortEnd = ({oldIndex, newIndex}) => {
    setColors(arrayMove(colors, oldIndex, newIndex))
  }

  const paletteIsFull = colors.length >= props.maxColors;

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
          
          <ValidatorForm onSubmit={handleSubmit}>
            <TextValidator 
            label="Palette Name"
            value={newNames.palette}
            onChange={handleChange}
            name='palette'
            validators={["required", "isPaletteNameUnique"]}
            errorMessages={["Enter Palette Name!", "Name already taken"]} 
            />
          <Button variant="contained" color="primary" type="submit">Save Palette</Button>
          </ValidatorForm>
        </Toolbar>
      </AppBar>
      <Drawer
        className={classes.drawer}
        variant="persistent"
        anchor="left"
        open={open}
        classes={{
          paper: classes.drawerPaper,
        }}
      >
        <div className={classes.drawerHeader}>
          <IconButton onClick={handleDrawerClose}>
            <ChevronLeftIcon />
          </IconButton>
        </div>
        <Divider />
        <Typography varient="h4">
          Design Your Palette
        </Typography>
        <div>
          <Button variant="contained" color="secondary" onClick={clearPalette}>
            Clear Palette
          </Button>
          <Button variant="contained" color="primary" onClick={addRandomColor} disabled={paletteIsFull}>
            Random Color
          </Button>
        </div>
        <ChromePicker color={currentColor} onChangeComplete={updateCurrentColor}/>
        <ValidatorForm onSubmit={addNewColor}>
          <TextValidator 
          value={newNames.color}
          name='color'
          onChange={handleChange}
          validators={["required", "isColorNameUnique", "isColorUnique"]}
          errorMessages={["Enter a color name!", "Name must be unique!", "Color must be unique"]} 
          />
          <Button
          type="submit" 
          variant="contained" 
          color="primary" 
          style={{backgroundColor: paletteIsFull ? "grey" : currentColor}}
          disabled={paletteIsFull}
          >
          {paletteIsFull ? "Palette is full" : "Add Colour"}
          </Button>
        </ValidatorForm>
        
      </Drawer>
      <main
        className={clsx(classes.content, {
          [classes.contentShift]: open,
        })}
      >
        <div className={classes.drawerHeader} />
        <DragColorList
          colors={colors}
          removeColor={removeColor}
          axis="xy"
          onSortEnd={onSortEnd}  
        />
      </main>
    </div>
  );
}

// export default NewPaletteForm;
