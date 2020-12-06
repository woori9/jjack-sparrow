import {
  USER_LOGIN,
  USER_LOGOUT,
  REGISTER_ADDRESS
} from '../constants/actionTypes';

export const userLogin = userData => {
  return {
    type: USER_LOGIN,
    payload: userData
  };
};

export const userLogout = () => {
  return {
    type: USER_LOGOUT
  };
}

export const registerAddress = address => {
  return {
    type: REGISTER_ADDRESS,
    payload: address
  };
}
