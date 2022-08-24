import React from 'react';
import { Container, Icon, Text } from './styles';

const Links = ({ text , handleCreateRoom }) => {
  return (
    <Container>
      <Icon src={`assets/icons/titles/${text.toLowerCase().split(' ').join('')}.png`} />
      <Text>{text}</Text>
      <button onClick={handleCreateRoom} style={{color: 'white', background: 'none', border: '2px solid white', borderRadius: '12px', padding: '6px 16px', fontSize: '16px'}}>Create New Room</button>
    </Container>
  )
}

export default Links;