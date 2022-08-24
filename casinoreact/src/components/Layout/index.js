import React, { useState, useEffect } from 'react';
import LoginForm from '../forms/LoginForm';
import StoreForm from '../forms/StoreForm';
import Footer from './Footer';
import Navbar from './Navbar';
import Sidebar from './Sidebar';
import { Wrapper, Content } from './styles';
import * as api from '../../controllers';
import { io } from 'socket.io-client';

const Layout = ({ selectedLink, children, noNavbar }) => {
  
  const [open, setOpen] = useState(true);
  const [form, setForm] = useState();
  const [userData, setUserData] = useState();
  const [socket, setSocket] = useState();

  const loggedPaths = ['/PokerOnline', '/rooms', '/wallet', '/points', '/blackjack', '/poker'];

  const handlePath = () => {
    if(loggedPaths.includes(window.location.pathname)){
      window.location.href = '/';
      return false;
    }else{
      return true;
    }
  }

  const getUser = async() => {
    const result = await api.getUserData();
    setUserData(result);
    if(result.error){
      handlePath();
    }
  }

  useEffect(() => {
    const newSocket = io(`wss://apicasino.herokuapp.com/poker-holdem`);
    setSocket(newSocket);
    return () => newSocket.close();
  }, [setSocket]);

  useEffect(() => {
    getUser();
  }, []);

  const childrenWithProps = children.length ? children.map((child, index) => {
    return React.cloneElement(child, { user: userData, key: index, socket })
  }) : React.cloneElement(children, { user: userData, socket })

  return (
    <Wrapper>
      <Sidebar selectedLink={selectedLink} setOpen={setOpen} open={open} resetUser={() => setUserData()} />
      <Content open={open}>
        {!noNavbar && <Navbar open={open} setForm={setForm} user={userData} />}
        {userData && childrenWithProps} {/* Adding props to children */}
        <Footer />
        {form === 'login' && <LoginForm startMode='login' setForm={setForm} refresh={getUser} />}
        {form === 'register' && <LoginForm startMode='register' setForm={setForm} refresh={getUser} />}
        {form === 'store' && <StoreForm setForm={setForm} userId={userData._id} />}
      </Content>
    </Wrapper>
  )
}

export default Layout;