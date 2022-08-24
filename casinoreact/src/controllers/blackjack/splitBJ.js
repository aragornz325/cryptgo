import { apiURI } from '../../config/keys';

const splitBJ = (userId, index) => {
  const body = {
    userId,
    index
  }
  return fetch(`${apiURI}/blackjack/split`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json())
  .catch(err => console.error(err))
}

export default splitBJ;