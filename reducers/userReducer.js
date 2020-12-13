import {
  USER_LOGIN,
  USER_LOGOUT,
  UPDATE_ADDRESS,
  ADD_USER_PET,
  ADD_USER_PENDING_MATCH,
  CHECK_USER_MATCH_STATUS,
  ADD_SUCCESFUL_MATCH,
  DELETE_MY_PENDING_MATCH,
} from '../constants/actionTypes';

const initialState = {
  isLoggedIn: false,
  waitingMatch: [],
  successMatch: [],
  pastMatch: [],
  userData: null
};

const user = (state = initialState, action) => {
  switch (action.type) {
    case USER_LOGIN:
      return {
        ...state,
        isLoggedIn: true,
        userData: action.payload
      };
    case USER_LOGOUT:
      return initialState;
    case UPDATE_ADDRESS:
      const { address, location } = action.payload;
      return {
        ...state,
        userData: {
          ...state.userData,
          address: {
            description: address,
            location
          }
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
    case CHECK_USER_MATCH_STATUS: //userData의 match는 처음 가져온 이후 업데이트 하지 않고 리덕스를 통해서 관리한다.
      const match = action.payload;
      const pendingMatch = match.filter(item => item.status === 1);
      const successMatch = match.filter(item => item.status === 2);
      const pastMatch = match.filter(item => item.status === 3);

      return {
        ...state,
        waitingMatch: pendingMatch,
        successMatch: successMatch,
        pastMatch: pastMatch
      };
    case ADD_USER_PENDING_MATCH:
      return {
        ...state,
        waitingMatch: [...state.waitingMatch, action.payload]
      };
    case ADD_SUCCESFUL_MATCH:
      return {
        ...state,
        successMatch: [...state.successMatch, action.payload]
      };
    case DELETE_MY_PENDING_MATCH:
      return {
        ...state,
        waitingMatch: state.waitingMatch.filter(pending => pending._id !== action.payload)
      };
    default:
      return state;
  }
};

export default user;
