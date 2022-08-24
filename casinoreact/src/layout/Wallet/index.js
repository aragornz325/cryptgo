import React, { useState } from 'react'
import Layout from '../../components/Layout'
import { Balance, BalanceContainer, BalanceTitle, Coin, Option, Selector, Title, TitleContainer, TitleIcon, Wrapper } from './styles'
import Orders from '../../components/main/Orders';
import Extractor from '../../components/Extractor';
import Withdraw from '../../components/main/Withdraw';
import Tips from '../../components/main/Tips';

const Wallet = () => {

  const [user, setUser] = useState();
  const selectOptions = ['Deposits', 'Withdraw', 'Tips'];
  const [selected, setSelected] = useState(selectOptions[0]);
  
  return (
    <Layout selectedLink={2}>
      <Extractor setUser={setUser} />
      <Wrapper>
        <TitleContainer>
          <TitleIcon src="/assets/icons/walletActive.png" />
          <Title>My wallet</Title>
        </TitleContainer>
        <BalanceContainer>
          <BalanceTitle>Total balance</BalanceTitle>
          <Balance>{user?.balance}</Balance>
          <Coin src="/assets/icons/coin.png" />
        </BalanceContainer>
        <Selector>
          {selectOptions.map((option, i) => {
            return <Option onClick={() => setSelected(option)} selected={selected === option}>{option}</Option>
          })}
        </Selector>
        {selected === 'Deposits' && <Orders user={user} />}
        {selected === 'Withdraw' && <Withdraw />}
        {selected === 'Tips' && <Tips />}
      </Wrapper>
    </Layout>
  )
}

export default Wallet