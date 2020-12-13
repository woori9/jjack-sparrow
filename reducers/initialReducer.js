import {
  USER_LOGIN,
  USER_LOGOUT,
  CHECK_ADDRESS,
  UPDATE_ADDRESS,
} from '../constants/actionTypes';

const initialState = {
  isLoggedIn: false,
  address: null
};

const initialSetting = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        isLoggedIn: true
      };
    case USER_LOGOUT:
      return {
        ...state,
        isLoggedIn: false
      };
    case CHECK_ADDRESS:
      return {
        ...state,
        address: action.payload
      };
    case UPDATE_ADDRESS:
      const { address } = action.payload;
      return {
        ...state,
        address: address
      };
    default:
      return state;
  }
};

export default initialSetting;
