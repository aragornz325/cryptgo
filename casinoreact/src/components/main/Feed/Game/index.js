import React from 'react'
import { Coin, Container, GameBG, GameButton, GameButtons, GameContent, GameFav, GameInfo, GameOptions, GamePlayers, GamePreview, GamePrice, GameTitle, Wrapper } from './styles'

const Game = ({ title, url, big, favourite }) => {
  return (
    <Container big={big}>
      {/* <GameBG src="/assets/gameBG.png" /> */}
      <GameContent>
        <GameTitle>{title}</GameTitle>
        <GamePreview src={`/assets/preview/${url}.png`} />
        <GameOptions>
          <GameInfo>
            <GamePlayers>6 Players</GamePlayers>
            <GamePrice><Coin src="/assets/icons/coinC.png"/> 0.67</GamePrice>
          </GameInfo>
          <GameButtons>
            <GameFav src={favourite ? '/assets/icons/favouriteOn.png' : '/assets/icons/favouriteOff.png' } />
            <GameButton onClick={() => window.location = url}>Play</GameButton>
          </GameButtons>
        </GameOptions>
      </GameContent>
    </Container>
  )
}

export default Game