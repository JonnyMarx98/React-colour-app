import React, { Component, useState, useEffect } from 'react';
import Button from '@material-ui/core/Button'
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import {ChromePicker} from 'react-color';

export default function ColorPickerForm(props) {
  const {newNames, handleChange, paletteIsFull, currentColor, addNewColor, updateCurrentColor} = props;
  return (
    <div>
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
    </div>
  )
}
