import styled from "styled-components";
import * as palette from '../../../utils/colors/palettes/default';

export const Container = styled.div`
  display: flex;
  align-items: center;
  flex-wrap: nowrap;
  width: 100%;
  gap: 16px;
  padding: 0px 120px;
`

export const Icon = styled.img`
  width: 40px;
  height: 40px;
`

export const Text = styled.h1`
  font-size: 40px;
  font-weight: 800;
  color: ${palette.text};
`