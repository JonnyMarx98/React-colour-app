import React from 'react';
import {withStyles} from '@material-ui/styles';
import {SortableElement} from "react-sortable-hoc";
import DeleteIcon from '@material-ui/icons/Delete';
import styles from './styles/DragColorBoxStyles';

const DragColorBox = SortableElement((props) => {
  const {classes, handleClick, color, name} = props;
  return (
    <div className={classes.root} style={{backgroundColor: color}} >
      <div className={classes.boxContent}>
        <span className={classes.colorName}>{name}</span>
        <DeleteIcon className={classes.deleteIcon} onClick={handleClick}/>
      </div>
    </div>
  )
});

export default withStyles(styles)(DragColorBox);