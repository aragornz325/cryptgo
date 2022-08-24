import React from 'react'
import Layout from '../../components/Layout';
import Title from '../../components/main/Title';
import SettingsForm from '../../components/forms/SettingsForm';

const PasswordAndSecurity = () => {
  return (
    <Layout selectedLink={7}>
      <Title text="Password & Security" />
      <SettingsForm linkData={[
        { label: 'Current Password', required: true, input: { name: 'name' } },
        { label: 'New Password', required: true, input: { name: 'name' } },
        { label: 'Re-type Password', required: true, input: { name: 'name' } },
        { label: 'Wanna set a password hint?', input: { name: 'name' } },
      ]}/>
    </Layout>
  )
}

export default PasswordAndSecurity;