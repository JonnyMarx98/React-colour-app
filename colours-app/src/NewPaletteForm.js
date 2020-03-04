import React, { useState, useEffect } from 'react';
import clsx from 'clsx';
import { useTheme } from '@material-ui/core/styles';
import Drawer from '@material-ui/core/Drawer';
import Typography from '@material-ui/core/Typography';
import Divider from '@material-ui/core/Divider';
import IconButton from '@material-ui/core/IconButton';
import Button from '@material-ui/core/Button'
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import { ValidatorForm } from 'react-material-ui-form-validator';
import { arrayMove } from 'react-sortable-hoc';

import DragColorList from './DragColorList';
import PaletteFormNav from './PaletteFormNav';
import ColorPickerForm from './ColorPickerForm';
import seedColors from './seedColors';
import useStyles from './styles/NewPaletteFormStyles'


NewPaletteForm.defaultProps = {
  maxColors: 20
}

export default function NewPaletteForm(props){
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = useState(true);
  const [currentColor, setCurrentColor] = useState("red");
  const [colors, setColors] = useState(seedColors[0].colors);
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

  const handleSubmit = (newPalette) => {
    let newName = newNames.palette;
    newPalette.id = newName.toLowerCase().replace(/ /g, "-");
    newPalette.colors = colors;
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
      <PaletteFormNav
        open={open}
        handleDrawerOpen={handleDrawerOpen}
        handleSubmit={handleSubmit}
        handleChange={handleChange}
        newNames={newNames}  
      />
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
        <div className={classes.container}>
          <Typography varient="h3" gutterBottom>
            Design Your Palette
          </Typography>
          <div className={classes.buttons}>
            <Button
              variant="contained"
              color="secondary"
              onClick={clearPalette}
              className={classes.button}
            >
              Clear Palette
            </Button>
            <Button 
              variant="contained"
              color="primary"
              onClick={addRandomColor}
              disabled={paletteIsFull}
              className={classes.button}
            >
              Random Color
            </Button>
          </div>
          <ColorPickerForm 
            newNames={newNames}
            handleChange={handleChange}
            paletteIsFull={paletteIsFull}
            currentColor={currentColor}
            addNewColor={addNewColor}
            updateCurrentColor={updateCurrentColor}
          />
        </div>
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
          distance={5}  
        />
      </main>
    </div>
  );
}

// export default NewPaletteForm;
