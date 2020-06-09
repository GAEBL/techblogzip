import createActionTypes from '../lib/createActionTypes';
import createRequestThunk from '../lib/createRequestThunk';
import { Trend } from '../api/trend';
import { handleActions, createAction } from 'redux-actions';
import produce from 'immer';
import notAllowed from '../lib/notAllowed';

const CHANGE_INPUT = 'trend/CHANGE_INPUT';

const [
  GET_RANK_TAGS,
  GET_RANK_TAGS_SUCCESS,
  GET_RANK_TAGS_FAILURE,
] = createActionTypes('trend/GET_RANK_TAGS');

const [
  GET_TAG_COUTN_BY_COMPANIES,
  GET_TAG_COUTN_BY_COMPANIES_SUCCESS,
  GET_TAG_COUTN_BY_COMPANIES_FAILURE,
] = createActionTypes('trend/GET_TAG_COUTN_BY_COMPANIES');

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
export const getTagCounts = createRequestThunk(
  GET_TAG_COUTN_BY_COMPANIES,
  Trend.getTagCountByCompanies,
);
export const getCompanyPostingDates = createRequestThunk(
  GET_COMPANY_POSTING_DATES,
  Trend.getCompanyPostingDates,
);
export const clearTrendData = createAction(CLEAR_TREND_DATA);

const initialState = {
  trendForm: {
    company: 'SAMSUNG SDS',
    startDate: new Date('2018-01-01'),
    endDate: new Date(),
    targetData: 'backend',
  },
  rankTags: null,
  tagCounts: null,
  companyPostingDates: null,
  selectedCompany: null,
  selectedDate: {
    start: null,
    end: null,
  },
  error: {
    rankTags: null,
    tagCounts: null,
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
        draft.tagCounts = null;
        draft.companyPostingDates = null;
        draft.selectedCompany = null;
        draft.selectedDate = null;
        draft.error = {
          rankTags: null,
          tagCounts: null,
          companyPostingDates: null,
        };
      }),
    [GET_RANK_TAGS_SUCCESS]: (state, { payload: { data } }) =>
      produce(state, (draft) => {
        const filteredData = [];
        const target = state.trendForm.targetData;
        for (let i = 0; i < data.length; i++) {
          if (filteredData.length === 10) break;

          if (notAllowed[target].includes(data[i].name)) continue;

          filteredData.push(data[i]);
        }
        draft.rankTags = filteredData;
        draft.error.rankTags = null;
      }),
    [GET_RANK_TAGS_FAILURE]: (state, { payload: error }) =>
      produce(state, (draft) => {
        draft.rankTags = null;
        draft.error.rankTags = error;
      }),
    [GET_TAG_COUTN_BY_COMPANIES_SUCCESS]: (state, { payload: { data } }) =>
      produce(state, (draft) => {
        draft.tagCounts = data;
        draft.error.tagCounts = null;
      }),
    [GET_TAG_COUTN_BY_COMPANIES_FAILURE]: (state, { payload: error }) =>
      produce(state, (draft) => {
        draft.tagCounts = null;
        draft.error.tagCounts = error;
      }),
    [GET_COMPANY_POSTING_DATES_SUCCES]: (state, { payload }) =>
      produce(state, (draft) => {
        draft.companyPostingDates = { ...payload };
        draft.selectedCompany = state.trendForm.company;
        draft.selectedDate = {
          start: state.trendForm.startDate,
          end: state.trendForm.endDate,
        };
        draft.error.companyPostingDates = null;
      }),
    [GET_COMPANY_POSTING_DATES_FAILURE]: (state, { payload: error }) =>
      produce(state, (draft) => {
        draft.companyPostingDates = null;
        draft.selectedCompany = null;
        draft.selectedDate = null;
        draft.error.companyPostingDates = error;
      }),
  },
  initialState,
);

export default trend;
