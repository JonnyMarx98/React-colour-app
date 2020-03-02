import React, { useEffect } from 'react';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import { ValidatorForm, TextValidator } from 'react-material-ui-form-validator';
import {Picker} from 'emoji-mart';
import "emoji-mart/css/emoji-mart.css"

export default function PaletteMetaForm(props) {
  const [setOpen] = React.useState(true);
  const [stage, setStage] = React.useState("form")
  const { handleSubmit, newNames, handleChange, hideForm } = props;

  useEffect(() => {
    ValidatorForm.addValidationRule('isPaletteNameUnique', (value) => 
      props.palettes.every(
        ({paletteName}) => paletteName.toLowerCase() !== value.toLowerCase()
      )
    );
  })

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleCancel = () => {
    hideForm();
  };

  const showEmojiPicker = () => {
    setStage("emoji");
  }
  const savePalette = (emoji) => {
    const newPalette = {paletteName: newNames.palette, emoji: emoji.native}
    handleSubmit(newPalette);
    setStage("");
  }

  return (
    <div>
    <Dialog open={stage === "emoji"} onClose={handleCancel}>
      <DialogTitle>
        Choose a Palette Emoji
      </DialogTitle>
      <Picker
        onSelect={savePalette}
        title="Pick a Palette Emoji"
      />
    </Dialog>
    <Dialog open={stage === "form"} onClose={handleCancel} aria-labelledby="form-dialog-title">
      <DialogTitle id="form-dialog-title">Choose a Palette Name</DialogTitle>
      <ValidatorForm onSubmit={showEmojiPicker}>
      <DialogContent>
        <DialogContentText>
          Please enter a unique name for your beautiful new palette
        </DialogContentText>
          <TextValidator 
          label="Palette Name"
          value={newNames.palette}
          onChange={handleChange}
          name='palette'
          fullWidth
          margin="normal"
          validators={["required", "isPaletteNameUnique"]}
          errorMessages={["Enter Palette Name!", "Name already taken"]} 
          />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleCancel} color="primary">
          Cancel
        </Button>
        <Button variant="contained" color="primary" type="submit">
          Save Palette
        </Button>
      </DialogActions>
      </ValidatorForm>
    </Dialog>
    </div>
  );
}
