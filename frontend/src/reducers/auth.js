import { createAction, handleActions } from 'redux-actions';
import produce from 'immer';

const CHANGE_INPUT = 'auth/CHANGE_INPUT';

export const changeInput = createAction(
  CHANGE_INPUT,
  ({ type, name, value }) => ({
    type,
    name,
    value,
  }),
);

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
  },
};

const auth = handleActions(
  {
    [CHANGE_INPUT]: (state, { payload: form }) =>
      produce(state, (draft) => {
        const { type, name, value } = form;
        draft[type][name] = value;
      }),
  },
  initialState,
);

export default auth;
