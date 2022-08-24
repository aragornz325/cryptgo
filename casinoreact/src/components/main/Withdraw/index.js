import React from 'react'
import { Bold, Form, Input, InputSmall, Label, LabelSmall, Required, Submit, Wrapper } from './styles'

const Withdraw = () => {
  return (
    <Wrapper>
      <Form>
        <LabelSmall>Currency <Required>*</Required></LabelSmall>
        <InputSmall type="text" placeholder='0.00000'/>
        <Label><Bold>USDT</Bold> Address <Required>*</Required></Label>
        <Input type="text" placeholder='Insert your wallet address here' />
        <Label>Amount <Required>*</Required></Label>
        <Input type="number" placeholder='Insert your amount here' />
        <Submit type="submit">Withdraw</Submit>
      </Form>
    </Wrapper>
  )
}

export default Withdraw