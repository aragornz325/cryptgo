import React from 'react'
import SettingsSelect from '../../components/forms/SettingsSelect';
import Layout from '../../components/Layout';
import Title from '../../components/main/Title';

const Language = () => {
  return (
    <Layout selectedLink={7}>
      <Title text="Language" />
      <SettingsSelect title="language" options={[{ emoji: '🇺🇸', name: 'English', value: 'en' }, { emoji: '🇪🇸', name: 'Spanish', value: 'es' }, { emoji: '🇯🇵', name: 'Japanese', value: 'jp' }, { emoji: '🇮🇹', name: 'Italian', value: 'it' }, ]} />
    </Layout>
  )
}

export default Language;