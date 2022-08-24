import { apiURI } from '../../config/keys';

const createUser = (body) => {
  return fetch(`${apiURI}/api/users`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json())
  .catch(err => console.error(err))
}

export default createUser;