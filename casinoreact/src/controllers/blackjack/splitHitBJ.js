import { apiURI } from '../../config/keys';

const splitHitBJ = (userId, index, handIndex) => {
  const body = {
    userId,
    index,
    handIndex
  }
  return fetch(`${apiURI}/blackjack/split/hit`, {
    method: 'POST',
    body: JSON.stringify(body),
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json())
  .catch(err => console.error(err))
}

export default splitHitBJ;