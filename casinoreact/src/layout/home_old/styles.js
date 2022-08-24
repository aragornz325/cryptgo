import styled from 'styled-components';

export const Title = styled.div`
  margin-bottom: 15px;
  padding-left: 3%;
  font-size: min(9vw, 56px);
  color: #FFFFFF;
  margin-top: 8vh;
  @media (max-width: 768px) {   
    text-align: center;
    margin-top: 10%;
    padding:0;
  }
`

export const Games = styled.section`
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
`

export const GameWrapper = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-evenly;
`

export const Game = styled.a`
  width: 20vw;
  height: 20vw;
  margin-top: 1%;
  background: gold;
  text-decoration: none;
  color: black;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  border-radius: 3vw;
  text-align: center;
  overflow: hidden;
  transition: 1s;
  &:hover {
    transform: scale(1.07)
  }
`

export const Banners = styled.section`
  margin-top: 15vh;
  width: 100vw;
  height: 100vh;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  margin-left: 20vw;
`