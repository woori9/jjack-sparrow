import {
  UPDATE_ALL_PENDING_MATCH,
  DELETE_ONE_PENDING_MATCH
} from '../constants/actionTypes';

const initialState = [];

const allPendingMatch = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_ALL_PENDING_MATCH:
      return [...state, ...action.payload];
    case DELETE_ONE_PENDING_MATCH:
      return state.filter(pending => pending._id !== action.payload);
    default:
      return state;
  }
};

export default allPendingMatch;
