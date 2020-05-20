import { combineReducers } from 'redux';
import loading from './reducers/loading';
import auth from './reducers/auth';
import user from './reducers/user';
import post from './reducers/post';

export default combineReducers({
  loading,
  auth,
  user,
  post,
});
