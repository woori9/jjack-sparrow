import {
  USER_LOGIN,
  USER_LOGOUT,
  REGISTER_ADDRESS
} from '../constants/actionTypes';

const initialState = {
  isLoggedIn: false,
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
      }
    default:
      return state;
  }
};

export default userReducer;
