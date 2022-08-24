import { apiURI } from "../../config/keys"

const track = (id) => {

  const response = fetch(`${apiURI}/order/status/${id}`, {
    method: 'GET'
  })
  .then(res => res.json())
  .catch(err => { throw err });

  return response;
}

export default track;