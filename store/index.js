import { createStore, combineReducers } from 'redux';
import userReducer from '../reducers/userReducer';
import matchReducer from '../reducers/matchReducer';

const rootReducer = combineReducers({
  user: userReducer,
  pendingMatches: matchReducer
});

const store = createStore(rootReducer);

export default store;
