import React from 'react';
import {SortableContainer} from 'react-sortable-hoc';
import DragColorBox from './DragColorBox';

const DragColorList = SortableContainer(({colors, removeColor}) => {
  return (
    <div style={{height: "100%"}}>
      {colors.map((color, i) => (
          <DragColorBox
            color={color.color}
            name={color.name}
            key={color.name}
            index={i}
            handleClick={() => removeColor(color.name)}
          />
        ))}
    </div>
  )
})

export default DragColorList;