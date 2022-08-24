import { apiURI } from '../../config/keys';

const login = (body) => {
  return fetch(`${apiURI}/api/auth/login`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: new Headers({
      'Content-Type': 'application/json'
    }),
    credentials: 'include'
  })
  .then(res => res.json())
  .catch(err => console.error(err))
}

export default login;
