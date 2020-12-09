import {
  USER_LOGIN,
  USER_LOGOUT,
  REGISTER_ADDRESS,
  CHECK_USER_STATUS,
  ADD_USER_PET,
  ADD_USER_MATCH
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

export const checkUserStatus = () => {
  return {
    type: CHECK_USER_STATUS
  };
}

export const addUserPet = petData => {
  return {
    type: ADD_USER_PET,
    payload: petData
  }
};

export const addUserMatch = matchData => {
  console.log("RE", matchData);
  return {
    type: ADD_USER_MATCH,
    payload: matchData
  }
};
