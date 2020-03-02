import React from 'react';
import Button from '@material-ui/core/Button'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import {ChromePicker} from 'react-color';
import useStyles from './styles/ColorPickerFormStyles';

export default function ColorPickerForm(props) {
  const {newNames, handleChange, paletteIsFull, currentColor, addNewColor, updateCurrentColor} = props;
  const classes = useStyles();
  return (
    <div>
      <ChromePicker 
        color={currentColor}
        onChangeComplete={updateCurrentColor}
        className={classes.picker}
      />
        <ValidatorForm onSubmit={addNewColor}>
          <TextValidator 
          className={classes.colorNameInput}
          placeholder="Colour Name"
          value={newNames.color}
          name='color'
          variant="filled"
          margin="normal"
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
          className={classes.addColor}
          >
          {paletteIsFull ? "Palette is full" : "Add Colour"}
          </Button>
        </ValidatorForm>
    </div>
  )
}
