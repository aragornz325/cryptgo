import styled from "styled-components";
import * as palette from '../../../../utils/colors/palettes/default';

export const Circle = styled.div`
  border: .25vw solid ${palette.sPurple};
  border-radius: 100%;
  position: absolute;
  z-index: 10000;
  opacity: 1;
  @media (max-width: 650px){
    display: none;
  }
`