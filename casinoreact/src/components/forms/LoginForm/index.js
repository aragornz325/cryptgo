import React, { useEffect, useState } from 'react'
import { CloseBtn, ExternalBtn, ExternalBtnImg, ExternalButtons, ExternalOptions, ExternalTitle, Form, Info, Input, InputsContainer, Label, Recovery, Required, Submit, Switch, SwitchBar, SwitchOption, SwitchTitle, Wrapper } from './styles';
import { useForm } from 'react-hook-form';
import * as api from '../../../controllers';

const LoginForm = ({ setForm, startMode, refresh }) => {

  const [animation, setAnimation] = useState();
  const [mode, setMode] = useState(startMode);
  const { register, handleSubmit } = useForm();

  const closeForm = () => {
    setAnimation('fadeOut');
    setTimeout(() => {
      setForm('');
    }, 500);
  }

  useEffect(()=>{
      setAnimation('fadeIn');
  }, [])

  const inputs = mode === 'login' ? [
    { label: 'Username', required: true, name: 'username', placeholder: 'username' },
    { label: 'Password', required: true, name: 'password', placeholder: 'password', type: 'password' },
  ] : mode === 'register' ? [
    { label: 'Username', required: true, name: 'username', placeholder: 'username' },
    { label: 'First name', required: true, name: 'firstName', placeholder: 'first name' },
    { label: 'Last name', required: true, name: 'lastName', placeholder: 'last name' },
    { label: 'Password', required: true, name: 'password', placeholder: 'password', type: 'password' },
    { label: 'Email', required: true, name: 'email', placeholder: 'email', type: 'email' },
    { label: 'Phone', required: true, name: 'phone', placeholder: 'phone' },
    { label: 'Date of Birth', required: true, name: 'birthday', placeholder: 'birthday', type: 'date' },
    { label: 'Code', required: false, name: 'code', placeholder: 'code' },
  ] : [];

  const onSubmit = async(data) => {
    let response = { error: 'Form mode is not valid.' };
    if(mode === 'login'){
      response = await api.login(data);
    }else if(mode === 'register'){
      response = await api.createUser(data);
      await api.login(data);
    }
    console.log(JSON.stringify(response));
    closeForm();
    refresh();
  }

  return (
    <Wrapper animation={animation}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <CloseBtn src="/assets/icons/close.png" onClick={() => closeForm()} />
        <Switch>
          <SwitchOption onClick={() => setMode('register')}>
            <SwitchTitle selected={mode === 'register'}>Register</SwitchTitle>
            <SwitchBar side="left" selected={mode === 'register'} />
          </SwitchOption>
          <SwitchOption onClick={() => setMode('login')}>
            <SwitchTitle selected={mode === 'login'}>Login</SwitchTitle>
            <SwitchBar side="right" selected={mode === 'login'} />
          </SwitchOption>
        </Switch>
        <InputsContainer>
          {inputs.map(input => {
            return <>
              <Label>{input.label} {input.required && <Required>*</Required>}</Label>
              <Input name={input.name} placeholder={`Insert your ${input.placeholder} here...`} type={input.type} {...register(input.name)} />
            </>
          })}
        </InputsContainer>
        {mode === 'register' && <Info>By clicking Register, you are indicating that you have read and acknowledge the Terms & Conditions</Info>}
        {mode === 'login' && <Submit type="submit">Sign In</Submit>}
        {mode === 'register' && <Submit type="submit">Register</Submit>}
        {/* <ExternalOptions>
          <ExternalTitle>Or continue with</ExternalTitle>
          <ExternalButtons>
            <ExternalBtn><ExternalBtnImg src="/assets/icons/google.png"/></ExternalBtn>
            <ExternalBtn><ExternalBtnImg src="/assets/icons/facebook.png"/></ExternalBtn>
            <ExternalBtn><ExternalBtnImg src="/assets/icons/twitch.png"/></ExternalBtn>
          </ExternalButtons>
        </ExternalOptions> */}
          {mode === 'login' && <Recovery href="/recovery">Forgot my password</Recovery>}
          <Info centered={true}>This site is protected by hCaptcha and the Captcha Privacy Policy and Terms of Service apply.</Info>
      </Form>
    </Wrapper>
  )
}

export default LoginForm;