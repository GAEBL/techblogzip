import createActionTypes from '../lib/createActionTypes';
import createRequestThunk from '../lib/createRequestThunk';
import { Trend } from '../api/trend';
import { handleActions } from 'redux-actions';

const [
  GET_TREND_DATA,
  GET_TREND_DATA_SUCCESS,
  GET_TREND_DATA_FAILURE,
] = createActionTypes('trend/GET_TREND_DATA');

export const getTrendData = createRequestThunk(
  GET_TREND_DATA,
  Trend.getTrendResults,
);

const initialState = {
  data: null,
  lastPage: null,
  error: null,
};

const trend = handleActions(
  {
    [GET_TREND_DATA_SUCCESS]: (state, { payload: { lastPage, data } }) => ({
      lastPage,
      data,
      error: null,
    }),
    [GET_TREND_DATA_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initialState,
);

export default trend;
