import { apiURI } from '../../config/keys';

const updateOrder = async (id, body) => {

  const response = await fetch(`${apiURI}/order/${id}`, {
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

export default updateOrder;