
import { useEffect } from 'react'
import useActions from '../../hooks/useActions'
import SideBar from './SideBar/SideBar'
import Router from './Router'

const App = () => {

  const { getUserData } = useActions()

  useEffect(()=>{
    getUserData()
  },[])

  return (
    <>
      <SideBar />
      <Router />
    </>
  )
}

export default App