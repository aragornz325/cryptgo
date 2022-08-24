import { apiURI } from '../../config/keys';

const checkPO = (userId) => {
  const body = {
    userId
  }
  return fetch(`${apiURI}/offline/check`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json())
  .catch(err => console.error(err))
}

export default checkPO;