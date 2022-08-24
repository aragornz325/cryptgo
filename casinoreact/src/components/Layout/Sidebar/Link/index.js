import React from 'react';
import { Link, LinkIcon, LinkText, Glow } from './styles';

const SideLink = ({ active, open, text, url, onClick }) => {
  
  let checkedUrl;
  switch(url){
    case 'home':
      checkedUrl = '';
      break;
    case 'exit':
      checkedUrl = '#';
      break;
    default:
      checkedUrl = url;
      break;
  }

  return (
    <Link active={active} href={`/${checkedUrl}`} open={open} onClick={onClick} >
      <LinkIcon src={`assets/icons/${url}.png`} open={open}/>
      <LinkText open={open}>{text}</LinkText>
      <Glow active={active} open={open} />
    </Link>
  )
}

export default SideLink;