import { apiURI } from "../../config/keys"

const getOrders = (id) => {

  const response = fetch(`${apiURI}/order/${id}`, {
    method: 'GET'
  })
  .then(res => res.json())
  .catch(err => { throw err });

  return response;
}

export default getOrders;