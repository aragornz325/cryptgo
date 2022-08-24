import React from 'react'
import Layout from '../../components/Layout';
import Feed from '../../components/main/Feed';

const Home = () => {
  return (
    <Layout selectedLink={1}>
      <Feed />
    </Layout>
  )
}

export default Home;