import { combineReducers } from 'redux';
import loading from './reducers/loading';
import auth from './reducers/auth';
import user from './reducers/user';
import post from './reducers/post';
import search from './reducers/search';

export default combineReducers({
  loading,
  auth,
  user,
  post,
  search,
});
