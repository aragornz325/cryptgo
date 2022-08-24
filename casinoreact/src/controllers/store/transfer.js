import { apiURI } from "../../config/keys"

const transfer = async(userId, coins, orderId) => {

  let response = await fetch(`${apiURI}/order/${orderId}`, {
    method: 'PUT',
    body: JSON.stringify({ synced: true }),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(res => res.json())
  .catch(err => { console.log(err) });
  const response2 = await fetch(`${apiURI}/users/addCoins/${userId}`, {
    method: 'PUT',
    body: JSON.stringify({coins}),
    headers: {
      'Content-Type': 'application/json',
    },
  })
  .then(res => res.json())
  .catch(async() => {
    response = await fetch(`${apiURI}/order/${orderId}`, {
      method: 'PUT',
      body: JSON.stringify({ synced: false }),
      headers: {
        'Content-Type': 'application/json',
      },
    })
    .then(res => res.json())
    .catch(err => { throw err })
  })
  return {order: response, user: response2};
}

export default transfer;