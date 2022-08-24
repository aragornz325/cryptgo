import React, { useEffect } from 'react'

const Extractor = ({ user, setUser }) => {
  
  useEffect(() => {
    user && setUser(user);
  }, [user])
  
  return <></>;
}

export default Extractor