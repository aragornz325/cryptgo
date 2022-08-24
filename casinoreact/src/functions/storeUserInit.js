import setUsername from "../store/actionCreators/setUsername";
import * as api from '../controllers';

const storeUserInit = async() => {
  const userData = await api.getUserData();
  // console.log('userDate', userData)
  if(userData){
    if(userData.username){
      setUsername(userData.username);
    }
  }
}

export default storeUserInit;