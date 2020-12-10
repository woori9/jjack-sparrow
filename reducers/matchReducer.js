import {
  UPDATE_PENDING_MATCH
} from '../constants/actionTypes';

const initialState = [];

const matchReducer = (state = initialState, action) => {
  switch (action.type) {
    case UPDATE_PENDING_MATCH:
      return [...action.payload];
    default:
      return state;
  }
};

export default matchReducer;
