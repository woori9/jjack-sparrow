import {
  USER_LOGIN,
  USER_LOGOUT,
  UPDATE_ADDRESS,
  CHECK_USER_STATUS,
  ADD_USER_PET,
  ADD_USER_MATCH,
  UPDATE_PENDING_MATCH
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

export const updateAddress = (address, location) => {
  return {
    type: UPDATE_ADDRESS,
    payload: {
      address,
      location
    }
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
  return {
    type: ADD_USER_MATCH,
    payload: matchData
  }
};

export const updatePendingMatch = pendingMatches => {
  return {
    type: UPDATE_PENDING_MATCH,
    payload: pendingMatches
  }
};
