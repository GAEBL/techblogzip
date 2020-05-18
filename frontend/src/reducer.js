import { combineReducers } from 'redux';
import loading from './reducers/loading';
import auth from './reducers/auth';

export default combineReducers({
  loading,
  auth,
});
