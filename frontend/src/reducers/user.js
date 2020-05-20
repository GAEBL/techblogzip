import { Auth } from '../api/auth';
import { createAction, handleActions } from 'redux-actions';
import createRequestThunk from '../lib/createRequestThunk';
import createActionTypes from '../lib/createActionTypes';

const LOGOUT = 'user/LOGOUT';
const [CHECK, CHECK_SUCCESS, CHECK_FAILURE] = createActionTypes('user/CHECK');
const TEMP_SET_USER = 'user/TEMP_SET_USER';

export const logout = createAction(LOGOUT);
export const check = createRequestThunk(CHECK, Auth.check);
export const tempSetUser = createAction(TEMP_SET_USER, (user) => user);

const initialState = {
  isLoggedIn: false,
  currentUser: null,
  error: null,
};

const user = handleActions(
  {
    [LOGOUT]: (state) => ({
      ...state,
      isLoggedIn: false,
      currentUser: null,
    }),
    [CHECK_SUCCESS]: (state, { payload: { user } }) => ({
      ...state,
      isLoggedIn: true,
      currentUser: user,
      error: null,
    }),
    [CHECK_FAILURE]: (state, { payload: error }) => ({
      ...state,
      isLoggedIn: false,
      currentUser: null,
      error,
    }),
    [TEMP_SET_USER]: (state, { payload: user }) => ({
      ...state,
      isLoggedIn: true,
      currentUser: user,
    }),
  },
  initialState,
);

export default user;
