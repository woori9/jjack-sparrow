import {
  USER_LOGIN,
  USER_LOGOUT,
  REGISTER_ADDRESS,
  ADD_USER_PET
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
      };
    case ADD_USER_PET:
      return {
        ...state,
        userData: {
          ...state.userData,
          pet: [...pet, action.payload]
        }
      };
    default:
      return state;
  }
};

export default userReducer;
