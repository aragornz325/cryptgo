import React from 'react';
import { Btn } from './styles.js';

const OptionButton = ({ text, clickFunction }) => {
  return (
      <Btn onClick={clickFunction}>{text}</Btn>
  )
}

export default OptionButton;
