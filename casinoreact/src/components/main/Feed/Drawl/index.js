import React from 'react';
import { Drawls, DrawlInfo, Buttons, Favourite, FavIcon, Button, SlideSelector, SlideSelect, Division, Carousel } from './styles';

const Drawl = () => {
  return (
    <Drawls>
        <DrawlInfo>Lucky drawls!</DrawlInfo>
        <Carousel></Carousel>
        <Buttons>
          <Division>
            <Favourite><FavIcon src="/assets/icons/heartFull.png" /> Add to favourites</Favourite>
          </Division>
          <Division>
            <SlideSelector>
              <SlideSelect selected={true} />
              <SlideSelect />
              <SlideSelect />
            </SlideSelector>
          </Division>
          <Division>
            <Button>Bet</Button>
          </Division>
        </Buttons>
      </Drawls>
  )
}

export default Drawl