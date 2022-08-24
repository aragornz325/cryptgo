import React from 'react';
import { Circle } from './styles.js';

const Marker = ({ width, height, top, left }) => {

  return (
    <Circle style={{width, height, top, left}}>
    </Circle>
  )
}

export default Marker;