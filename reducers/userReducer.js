import {
  USER_LOGIN,
  USER_LOGOUT,
  UPDATE_ADDRESS,
  ADD_USER_PET,
  ADD_USER_PENDING_MATCH,
  CHECK_USER_MATCH_STATUS,
  ADD_SUCCESFUL_MATCH,
  DELETE_MY_PENDING_MATCH,
  DELETE_MY_EXPIRED_PENDING_MATCHES,
  MOVE_EXPIRED_SUCCESS_MATCH_TO_PAST
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

    case CHECK_USER_MATCH_STATUS:
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

    case DELETE_MY_EXPIRED_PENDING_MATCHES:
      const notExpired = state.waitingMatch.reduce((filtered, pending) => {
        if (action.payload.indexOf(pending._id) === -1) {
          filtered.push(pending);
        }
        return filtered;
      }, []);

      return {
        ...state,
        waitingMatch: [...notExpired]
      };

    case MOVE_EXPIRED_SUCCESS_MATCH_TO_PAST:
      const updatedMatch = action.payload;

      return {
        ...state,
        successMatch: state.successMatch.filter(success => success._id !== updatedMatch._id),
        pastMatch: [...state.pastMatch, action.payload],
      };

    default:
      return state;
  }
};

export default user;
