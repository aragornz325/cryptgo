import { apiURI } from '../../config/keys';

const deleteAllStats = () => {
  return fetch(`${apiURI}/stats`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(res => res.json())
  .catch(err => console.error(err));
}

export default deleteAllStats;