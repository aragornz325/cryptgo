import { apiURI } from "../../config/keys"

const getOrders = () => {

  const response = fetch(`${apiURI}/order/`, {
    method: 'GET'
  })
  .then(res => res.json())
  .catch(err => { throw err });

  return response;
}

export default getOrders;