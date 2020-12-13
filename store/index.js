import { createStore, combineReducers } from 'redux';
import user from '../reducers/userReducer';
import allPendingMatch from '../reducers/matchReducer';
import initialSetting from '../reducers/initialReducer';

const rootReducer = combineReducers({
  user,
  allPendingMatch,
  initialSetting
});

const store = createStore(rootReducer);
export default store;
