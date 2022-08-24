import React from 'react'
import SettingsForm from '../../components/forms/SettingsForm';
import Layout from '../../components/Layout';
import Title from '../../components/main/Title';

const EditProfile = () => {
  return (
    <Layout selectedLink={7}>
      <Title text="Edit Profile" />
      <SettingsForm linkData={[
        { label: 'Username', input: { name: 'name', placeholder: 'Full Name', value: 'username' } },
        { label: 'Email', input: { name: 'email', placeholder: 'Email', value: 'email' } },
        { label: 'Phone Number', input: { name: 'phone', placeholder: 'Phone Number', value: 'phone' } },
        { label: 'Birthday', input: { name: 'birthday', placeholder: 'Birthday' } },
      ]} />
    </Layout>
  )
}

export default EditProfile;