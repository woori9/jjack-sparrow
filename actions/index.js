import {
  USER_LOGIN,
  USER_LOGOUT
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
