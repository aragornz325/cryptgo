import { apiURI } from '../../config/keys';

const logout = () => {
  return fetch(`${apiURI}/auth/logout`, {
    method: 'POST',
    credentials: 'include'
  })
  .then(res => res.json())
  .catch(err => console.error(err))
}

export default logout;