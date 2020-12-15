import { createStore, combineReducers } from 'redux';
import user from '../reducers/userReducer';
import allPendingMatch from '../reducers/matchReducer';
import initialSetting from '../reducers/initialReducer';
import chat from '../reducers/ChatReducer';

const rootReducer = combineReducers({
  user,
  allPendingMatch,
  initialSetting,
  chat
});

const store = createStore(rootReducer);
export default store;
