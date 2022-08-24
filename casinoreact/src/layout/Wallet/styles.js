import styled from "styled-components";
import * as palette from '../../utils/colors/palettes/default';

export const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 32px;
`

export const TitleContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  margin-top: 24px;
`

export const TitleIcon = styled.img`
  width: 36px;
  height: 36px;
`

export const Title = styled.h1`
  font-size: 36px;
  font-weight: 600;
  color: ${palette.activeText};
  margin: 0;
`

export const BalanceContainer = styled.div`
  display: flex;
  min-width: 60%;
  align-items: center;
  justify-content: center;
  border: 2px solid ${palette.sLightblue};
  padding: 16px 8px;
  border-radius: 56px;
  gap: 16px;
`

export const BalanceTitle = styled.p`
  font-size: 32px;
  color: ${palette.text};
  font-weight: 400;
  margin: 0;
`

export const Coin = styled.img`
  width: 32px;
  height: 32px;
`

export const Balance = styled.p`
  font-size: 32px;
  color: ${palette.sLightblue};
  font-weight: 500;
  margin: 0;
`

export const Selector = styled.div`
  display: flex;
  justify-content: center;
  gap: 16px;
  width: min(80%, 850px);
`

export const Option = styled.button`
  color: ${palette.text};
  font-size: 17px;
  font-weight: ${props => props.selected ? 700 : 500};;
  padding: 10px 0;
  width: 150px;
  background: ${props => props.selected ? palette.submitPurple : palette.softBackground};
  border: none;
  border-radius: 24px;
  transition: ${palette.tHover};
  cursor: pointer;

  &:hover{
    box-shadow: 0 0 4px ${palette.sDarkPink};
  }
`