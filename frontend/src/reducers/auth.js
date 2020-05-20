import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';
import createRequestThunk from '../lib/createRequestThunk';
import { Auth } from '../api/auth';
import createActionTypes from '../lib/createActionTypes';

const CHANGE_INPUT = 'auth/CHANGE_INPUT';
const [LOGIN, LOGIN_SUCCESS, LOGIN_FAILURE] = createActionTypes('auth/LOGIN');
const [REGISTER, REGISTER_SUCCESS, REGISTER_FAILURE] = createActionTypes(
  'auth/REGISTER',
);

export const changeInput = createAction(
  CHANGE_INPUT,
  ({ type, name, value }) => ({
    type,
    name,
    value,
  }),
);
export const login = createRequestThunk(LOGIN, Auth.login);
export const register = createRequestThunk(REGISTER, Auth.register);

const initialState = {
  login: {
    username: '',
    password: '',
  },
  register: {
    username: '',
    email: '',
    password: '',
    passwordConfirm: '',
    is_subscribed: false,
  },
  error: null,
};

const auth = handleActions(
  {
    [CHANGE_INPUT]: (state, { payload: form }) =>
      produce(state, (draft) => {
        const { type, name, value } = form;
        draft[type][name] = value;
      }),
    [LOGIN_SUCCESS]: (state, { payload: { user } }) => ({
      ...state,
      error: null,
      login: initialState.login,
    }),
    [LOGIN_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [REGISTER_SUCCESS]: (state, { payload: { user } }) => ({
      ...state,
      error: null,
      register: initialState.register,
    }),
    [REGISTER_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initialState,
);

export default auth;
