import React from 'react'
import { Bold, Form, Input, InputSmall, Label, LabelSmall, Required, Submit, Wrapper } from './styles'

const Tips = () => {
  return (
    <Wrapper>
      <Form>
        <LabelSmall>Currency <Required>*</Required></LabelSmall>
        <InputSmall type="text" placeholder='0.00000'/>
        <Label>Message</Label>
        <Input type="text" placeholder='Insert your message here' />
        <Label>Amount <Required>*</Required></Label>
        <Input type="number" placeholder='Insert your amount here' />
        <Submit type="submit">Send Tip</Submit>
      </Form>
    </Wrapper>
  )
}

export default Tips