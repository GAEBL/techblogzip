import { combineReducers } from 'redux';
import loading from './reducers/loading';
import auth from './reducers/auth';
import user from './reducers/user';

export default combineReducers({
  loading,
  auth,
  user,
});
