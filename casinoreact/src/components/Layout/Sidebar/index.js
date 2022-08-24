import React, { useState } from 'react'
import { CategoryTitle, Container, Logo, LogoSmall, CloseBtn, Spacer } from './styles'
import SideLink from './Link';
import delete_cookie from '../../../functions/deleteCookie';
import * as api from '../../../controllers';

const Sidebar = ({ selectedLink, setOpen, open, resetUser }) => {

  const [glow] = useState(selectedLink);

  const logOut = async() => {
    console.log('clicked')
    const res = await api.logout(); 
    delete_cookie('connect.sid'); 
    resetUser();
  }

  return (
    <Container open={open}>

      <Logo src={`assets/icons/logo.png`} open={open} />
      <LogoSmall src={`assets/icons/logoSmall.png`} open={open} />
      <CloseBtn onClick={() => setOpen(!open)} />

      <Spacer height="130px" />

      {/* Links */}
      {/* Menu Category */}
      <CategoryTitle open={open}>Menu</CategoryTitle>
      <SideLink text="Home" url="home" active={glow === 1} open={open} />
      <SideLink text="My wallet" url="wallet" active={glow === 2} open={open} />
      <SideLink text="Points" url="points" active={glow === 3} open={open} />

      {/* Games Category */}
      <CategoryTitle open={open}>Games</CategoryTitle>
      <SideLink text="Recently Played" url="recent" active={glow === 4} open={open} />
      {/* <SideLink text="Top Rated" url="rating" active={glow === 5} open={open} /> */}
      <SideLink text="Favorites" url="favorites" active={glow === 6} open={open} />

      {/* General Category */}
      <CategoryTitle open={open}>General</CategoryTitle>
      <SideLink text="Settings" url="settings" active={glow === 7} open={open} />
      <SideLink text="Log Out" url="exit" active={glow === 8} open={open} onClick={logOut}/>

    </Container>
  )
}

export default Sidebar