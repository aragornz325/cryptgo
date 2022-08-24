import React, { useState, useEffect } from 'react';
import NavBar from '../../components/navigation/NavBar';
import { Carousel } from 'react-responsive-carousel';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import { Games, Title, Banners, GameWrapper, Game } from './styles';
import Carrousel from '../../components/navigation/Carrousel/Carrousel';
import News from '../../components/navigation/News/News.js'; 
import store from '../../store/reducers/store';
import Header from '../../components/navigation/Header/Header';
import Jackpots from '../../components/main/jackpots/Jackpots';
import Contact from '../../components/main/Contact/Contact';
import FAQ from '../../components/main/FAQ/FAQ';
import Footer from '../../components/navigation/Footer/Footer';
import ItemsCarousel from 'react-items-carousel';
import Slider from "react-slick";
import storeUserInit from '../../functions/storeUserInit';
import Popup from '../../components/main/Popup';
import Store from '../../components/main/Store';

const Home = () => {

  // useEffect(async()=>{
  //   await storeUserInit();
  //   if(!store.getState().username){
  //     return window.location = '/login';
  //   }
  // }, []);

  return (
    <>
      <Store />
      <Popup />
      <Header/>
      {/* <div style={{'color': '#EDBE18', 'marginTop': 100, 'textAlign': 'center'}}>Buy 0.000550 BTC for only $30 usd</div> */}
      <Title style={{color: '#FFFFFF'}}>Games</Title>
      <Carrousel items={['poker', 'blackjack', 'roulette', 'coming soon']} />
      <Title style={{color: '#FFFFFF'}}>Jackpots</Title>
      <Jackpots/>
      {/* <Title style={{color: '#FFFFFF', marginTop: 300}}>Latest News</Title> */}
      {/* <News/> */}
      <div style={{height: '200px'}} />
      <FAQ style={{paddingTop: '100px'}}/>
      <Contact/>
      <Footer/>
    </>
  )
}

export default Home;