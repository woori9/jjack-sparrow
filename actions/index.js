import {
  USER_LOGIN,
  USER_LOGOUT,
  REGISTER_ADDRESS,
  ADD_USER_PET
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
};

export const registerAddress = address => {
  return {
    type: REGISTER_ADDRESS,
    payload: address
  };
};

export const addUserPet = petData => {
  return {
    type: ADD_USER_PET,
    payload: petData
  }
};
