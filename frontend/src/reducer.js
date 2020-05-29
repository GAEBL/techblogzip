import { combineReducers } from 'redux';
import loading from './reducers/loading';
import auth from './reducers/auth';
import user from './reducers/user';
import post from './reducers/post';
import trend from './reducers/trend';

export default combineReducers({
  loading,
  auth,
  user,
  post,
  trend,
});
