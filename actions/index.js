import {
  USER_LOGIN,
  USER_LOGOUT,
  CHECK_ADDRESS,
  UPDATE_ADDRESS,
  CHECK_USER_MATCH_STATUS,
  ADD_USER_PET,
  ADD_USER_PENDING_MATCH,
  UPDATE_ALL_PENDING_MATCH,
  DELETE_ONE_PENDING_MATCH,
  ADD_SUCCESFUL_MATCH,
  DELETE_MY_PENDING_MATCH,
  DELETE_MY_EXPIRED_PENDING_MATCHES,
  MOVE_EXPIRED_SUCCESS_MATCH_TO_PAST,
  CHANGE_LAST_MESSAGE
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

export const checkAddress = address => {
  return {
    type: CHECK_ADDRESS,
    payload: address
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

export const checkUserMatchStatus = userMatchData => {
  return {
    type: CHECK_USER_MATCH_STATUS,
    payload: userMatchData
  };
}

export const addUserPet = petData => {
  return {
    type: ADD_USER_PET,
    payload: petData
  };
};

export const addUserPendingMatch = newPendingMatch => {
  return {
    type: ADD_USER_PENDING_MATCH,
    payload: newPendingMatch
  };
};

export const updateAllPendingMatch = pendingMatches => {
  return {
    type: UPDATE_ALL_PENDING_MATCH,
    payload: pendingMatches
  };
};

export const deleteThePendingMatch = id => {
  return {
    type: DELETE_ONE_PENDING_MATCH,
    payload: id
  };
};

export const addSuccessfulMatch = match => {
  return {
    type: ADD_SUCCESFUL_MATCH,
    payload: match
  };
};

export const deleteMyPending = id => {
  return {
    type: DELETE_MY_PENDING_MATCH,
    payload: id
  };
};

export const deleteMyExpiredPendingMatches = expiredIds => {
  return {
    type: DELETE_MY_EXPIRED_PENDING_MATCHES,
    payload: expiredIds
  };
};

export const deleteExpiredPendingMatches = expiredIds => {
  return {
    type: DELETE_EXPIRED_PENDING_MATCHES,
    payload: expiredIds
  };
};

export const moveFromSuccessToPast = updatedMatch => {
  return {
    type: MOVE_EXPIRED_SUCCESS_MATCH_TO_PAST,
    payload: updatedMatch
  };
};

export const updateLastMessage = (matchId, chatInfo) => {
  return {
    type: CHANGE_LAST_MESSAGE,
    payload: {
      matchId,
      chatInfo
    }
  };
};
