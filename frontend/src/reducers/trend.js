import createActionTypes from '../lib/createActionTypes';
import createRequestThunk from '../lib/createRequestThunk';
import { Trend } from '../api/trend';
import { handleActions, createAction } from 'redux-actions';
import produce from 'immer';

const CHANGE_INPUT = 'trend/CHANGE_INPUT';

const [
  GET_RANK_TAGS,
  GET_RANK_TAGS_SUCCESS,
  GET_RANK_TAGS_FAILURE,
] = createActionTypes('trend/GET_RANK_TAGS');

const [
  GET_TAG_DATES,
  GET_TAG_DATES_SUCCESS,
  GET_TAG_DATES_FAILURE,
] = createActionTypes('trend/GET_TAG_DATES');

const [
  GET_COMPANY_POSTING_DATES,
  GET_COMPANY_POSTING_DATES_SUCCES,
  GET_COMPANY_POSTING_DATES_FAILURE,
] = createActionTypes('trend/GET_COMPANY_POSTING_DATES');

const CLEAR_TREND_DATA = 'trend/CLEAR_TREND_DATA';

export const changeInput = createAction(CHANGE_INPUT, ({ name, value }) => ({
  name,
  value,
}));
export const getRankTags = createRequestThunk(GET_RANK_TAGS, Trend.getRankTags);
export const getTagDates = createRequestThunk(GET_TAG_DATES, Trend.getTagDates);
export const getCompanyPostingDates = createRequestThunk(
  GET_COMPANY_POSTING_DATES,
  Trend.getCompanyPostingDates,
);
export const clearTrendData = createAction(CLEAR_TREND_DATA);

const initialState = {
  trendForm: {
    company: 'WOOWABROS',
    startDate: new Date('2018-06-06'),
    endDate: new Date(),
    targetData: 'backend',
  },
  rankTags: null,
  tagDates: null,
  companyPostingDates: null,
  error: {
    rankTags: null,
    tagDates: null,
    companyPostingDates: null,
  },
};

const trend = handleActions(
  {
    [CHANGE_INPUT]: (state, { payload: form }) =>
      produce(state, (draft) => {
        const { name, value } = form;
        draft.trendForm[name] = value;
      }),
    [CLEAR_TREND_DATA]: (state) =>
      produce(state, (draft) => {
        draft.rankTags = null;
        draft.tagDates = null;
        draft.companyPostingDates = null;
        draft.error = {
          rankTags: null,
          tagDates: null,
          companyPostingDates: null,
        };
      }),
    [GET_RANK_TAGS_SUCCESS]: (state, { payload: { data } }) =>
      produce(state, (draft) => {
        draft.rankTags = data.slice(0, 5);
        draft.error.rankTags = null;
      }),
    [GET_RANK_TAGS_FAILURE]: (state, { payload: error }) =>
      produce(state, (draft) => {
        draft.rankTags = null;
        draft.error.rankTags = error;
      }),
    [GET_TAG_DATES_SUCCESS]: (state, { payload: { data } }) =>
      produce(state, (draft) => {
        draft.tagDates = data;
        draft.error.tagDates = null;
      }),
    [GET_TAG_DATES_FAILURE]: (state, { payload: error }) =>
      produce(state, (draft) => {
        draft.tagDates = null;
        draft.error.tagDates = error;
      }),
    [GET_COMPANY_POSTING_DATES_SUCCES]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.companyPostingDates = { ...payload };
        draft.error.companyPostingDates = null;
      }),
    [GET_COMPANY_POSTING_DATES_FAILURE]: (state, { payload: error }) =>
      produce(state, (draft) => {
        draft.companyPostingDates = null;
        draft.error.companyPostingDates = error;
      }),
  },
  initialState,
);

export default trend;
