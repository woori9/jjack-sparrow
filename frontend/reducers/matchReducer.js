import {
  UPDATE_ALL_PENDING_MATCH,
  DELETE_ONE_PENDING_MATCH,
  DELETE_EXPIRED_PENDING_MATCHES
} from '../constants/actionTypes';

const initialState = [];

const allPendingMatch = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_ALL_PENDING_MATCH:
      return [...state, ...action.payload];

    case DELETE_ONE_PENDING_MATCH:
      return state.filter(pending => pending._id !== action.payload);

    case DELETE_EXPIRED_PENDING_MATCHES:
      const notExpired = state.reduce((filtered, pending) => {
        if (action.payload.indexOf(pending._id) === -1) {
          filtered.push(pending);
        }
        return filtered;
      }, []);

      return notExpired;

    default:
      return state;
  }
};

export default allPendingMatch;
