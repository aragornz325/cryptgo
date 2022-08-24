import { apiURI } from '../../config/keys';

const updateCasino = async (id, body) => {

  const response = await fetch(`http://localhost:4000/api/users/addCoins/${id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(body),
  })
  .then(res => res.json())
  .catch(err => { throw err });
return response;
  console.log(response);
}

export default updateCasino;