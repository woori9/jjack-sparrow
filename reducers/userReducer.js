import {
  USER_LOGIN,
  USER_LOGOUT,
  REGISTER_ADDRESS,
  ADD_USER_PET,
  CHECK_USER_STATUS,
  ADD_USER_MATCH
} from '../constants/actionTypes';

const initialState = {
  isLoggedIn: false,
  isWaiting: false,
  isMatched: false,
  userData: null
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        userData: action.payload
      };
    case USER_LOGOUT:
      return {
        ...state,
        isloggedIn: false,
        userData: null
      };
    case REGISTER_ADDRESS:
      return {
        ...state,
        userData: {
          ...state.userData,
          address: action.payload
        }
      };
    case ADD_USER_PET:
      const { pet } = state.userData;

      return {
        ...state,
        userData: {
          ...state.userData,
          pet: [...pet, action.payload]
        }
      };
    case CHECK_USER_STATUS:
      const { match } = state.userData;
      const pendingMatch = match.filter(item => item.status === 1);
      const successMatch = match.filter(item => item.status === 2);
      const isWaiting = pendingMatch.length > 0 ? pendingMatch : false;
      const isMatched = successMatch.length > 0 ? successMatch : false;

      return {
        ...state,
        isWaiting: isWaiting,
        isMatched: isMatched
      };
    case ADD_USER_MATCH:
      return {
        ...state,
        isWaiting: action.payload,
        userData: {
          ...state.userData,
          match: [...state.userData.match, action.payload]
        }
      };
    default:
      return state;
  }
};

export default userReducer;
