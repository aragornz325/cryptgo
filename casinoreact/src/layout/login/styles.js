import styled from 'styled-components';

/* export const Form = styled.form`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-evenly;
  height: 60vh;
  margin-top: 10vh;
  background-color: rgba(255,255,255,0.13);
  width: 40vw;
  margin-left: 30vw;
  border-radius: 5vw;
` */
export const Form =styled.form `
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: row-reverse;
  border-radius: 16px;
  margin: 0;
  padding: 0;
  width: 70%;
  margin-left: 15%;
  overflow: hidden;
  @media(max-width: 600px){
    width: 100%;
    margin: 0;
  }
`

export const ImageCtn =styled.div `
  width: 100%;
  height: max(500px, 60vh); 
  margin-right: 0px;  
  padding: 0;
  background-color: #212121;
  @media (max-width: 900px) {
    display: none
  }
` 

export const Main =styled.div `
  display: flex;
  background-color: #212121;
  justify-content: center;
  align-items: center;
  flex-wrap: wrap;
  flex-direction: row;
  margin-top: 10vh;
  margin-bottom: 100px;
  width: 70%;
  height: 80vh;
  box-shadow: 0px 0px 10px 0px rgba(0, 0, 0, 0.329);
  @include xs{
      display: flex;
      box-shadow : 0px 0px 0px 0px;
      flex-direction: column-reverse;
  }
  @include sm{
      display: flex;
      box-shadow : 0px 0px 0px 0px;
      flex-direction: column-reverse;
  }

` 
export const FormCtn = styled.div`  
background-color: #FFFFFF;
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
height: 600px;
@include xs {
    margin-left: 40%;
}
@include sm {
    margin-left: 40%;
}
`
export const Input= styled.input`
background-color: blue;
border-radius: 3px;
border: none;
height: 40px;
font-size: 1.6vw;
transition: 1s;
color: #EEEEEE;
margin-top: 50px;

&:hover {
  transform: scale(1.05);
}

`

export const InputDiv = styled.div`
  width: 100%;
  height: 40px;
  margin: 20px;
  margin-left: 22%;
 
 
`

export const Div = styled.div`
display: flex;
justify-content: center;
align-items: center;
flex-direction: column;
width: 500px;
height: max(500px, 60vh);
background-color: #212121;
@media (max-width: 600px) {
  width: 100%;
}

`

export const BtnSubmit = styled.button`
  width: 65%;
  height: 45px;
  margin-top: 70px;
  transition: 0.5s;
  top: 19px;
  background: #EDBE18;
  box-shadow:  0px 4px 4px rgba(0, 0, 0, 0.25);
  border: 0;
  border-radius: 5px;
  font-family: Poppins;
  font-style: normal;
  font-weight: normal;
  font-size: 22px;
  line-height: 27px;  
  @media (max-width: 900px) {
    width: 30%;
  }
  
`

export const Link= styled.a`
  text-decoration: none;
  color: #EDBE18;
`

export const TextField = styled.input`
  width: 80%;
  height: 46px;
  margin-top: 32px;
  border-radius: 4px;
  border: none;
  outline: none;
  padding-left: 10px;
  font-size: 14px;
  background: #FFF;

  &:focus {
    outline: 2px solid gold;
  }
`