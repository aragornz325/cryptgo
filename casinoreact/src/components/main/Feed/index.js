import React, { useState } from 'react';
import Drawl from './Drawl';
import Game from './Game';
import { FilterIcon, Search, Input, SearchIcon, Actions, Games, Option, Selector, Title, Wrapper } from './styles';

const Feed = () => {

  const games = [
    { title: 'Poker Online', url: '/rooms' },
    { title: 'Roulette', url: '/roulette', favourite: true },
    { title: 'Blackjack', url: '/blackjack' },
    { title: 'Texas Hold\'Em', url: '/poker' },
    { title: 'Poker Online', url: '/rooms', big: true, favourite: true },
    { title: 'Roulette', url: '/roulette2' },
    { title: 'Blackjack', url: '/blackjack' },
    { title: 'Texas Hold\'Em', url: '/poker' },
  ]

  const tags = [
    { name: 'All the games' },
    { name: 'Hot bids', value: 'hot' },
    { name: 'Popular games', value: 'popular' },
    { name: 'Slots', value: 'slot' },
  ]

  const [category, setCategory] = useState();

  return (
    <Wrapper>
      <Drawl />
      <Actions>
        <Title>{tags.map(tag => tag.value === category && tag.name)}</Title>
        <Search>
          <SearchIcon src="assets/icons/search.png" />
          <Input placeholder='Search for games...' />
          <FilterIcon src="assets/icons/filter.png" />
        </Search>
      </Actions>
      <Selector>
        {tags.map((tag, i) => <Option key={i} selected={category === tag.value} onClick={() => setCategory(tag.value)} items={tags.length}>{tag.name}</Option>)}
      </Selector>
      <Games>
        {games.map(game => <Game title={game.title} url={game.url} big={game.big} favourite={game.favourite} />)}
      </Games>
    </Wrapper>
  )
}

export default Feed;