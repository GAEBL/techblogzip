import createActionTypes from '../lib/createActionTypes';
import createRequestThunk from '../lib/createRequestThunk';
import { Post } from '../api/post';
import { handleActions, createAction } from 'redux-actions';

const CLEAR_RESULTS = 'search/CLEAR_RESULTS';
const [
  GET_SEARCHRESULTS,
  GET_SEARCHRESULTS_SUCCEESS,
  GET_SEARCHRESULTS_FAILURE,
] = createActionTypes('search/GET_SEARCHRESULTS');

export const getSearchResults = createRequestThunk(
  GET_SEARCHRESULTS,
  Post.getSearchResults,
);
export const clearResults = createAction(CLEAR_RESULTS);

const initialState = {
  results: [],
  error: null,
};

const search = handleActions(
  {
    [GET_SEARCHRESULTS_SUCCEESS]: (state, { payload: { data } }) => ({
      ...state,
      results: data,
      error: null,
    }),
    [GET_SEARCHRESULTS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      results: [],
      error,
    }),
  },
  initialState,
);

export default search;
