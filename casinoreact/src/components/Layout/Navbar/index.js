import React, { useState } from 'react'
import { Container, Blobs, Blob, BlobIcon, BlobUserIcon, Username, UserMenu, Arrow, Title, Spacer, Login, Register, Balance, BalanceTitle, BalanceNumber, Titles, TitleContainer, TitleIcon } from './styles'

const Navbar = ({ open, setForm, user }) => {

  const [openUserMenu, setOpenUserMenu] = useState(false);

  return (
    <>
      <Spacer />  
      <Container open={open}>
        <Titles>
          <TitleContainer>
            <TitleIcon src="assets/icons/casino.png" />
            <Title onClick={() => window.location = '/'} active={window.location.pathname === '/'}>Casino</Title>
          </TitleContainer>
          <TitleContainer>
            <TitleIcon src="assets/icons/store.png" />
            <Title onClick={() => user && setForm('store')}>Store</Title>
          </TitleContainer>
        </Titles>
        <Blobs>
          { user && user._id ? (
            <>
              <Blob>
                <BlobIcon src="assets/icons/notification.png" />
              </Blob>
              <UserMenu onClick={() => setOpenUserMenu(!openUserMenu)}>
                <Blob>
                  <BlobUserIcon src="assets/1memoji.png" />
                </Blob>
                <Username>{user.username}</Username>
                <Arrow src="assets/icons/arrow.png" open={openUserMenu} />
              {openUserMenu && <Balance>
                <BalanceTitle>Your Balance</BalanceTitle>
                <BalanceNumber>{user.balance}</BalanceNumber>
              </Balance>}
              </UserMenu>
            </>
          ) : (
            <>
              <Login onClick={() => setForm('login')}>Login</Login>
              <Register onClick={() => setForm('register')}>Register</Register>
            </>
          )}
        </Blobs>
      </Container>
    </>
  )
}

export default Navbar