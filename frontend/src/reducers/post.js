import createActionTypes from '../lib/createActionTypes';
import createRequestThunk from '../lib/createRequestThunk';
import { Post } from '../api/post';
import { handleActions, createAction } from 'redux-actions';

const CLEAR_POSTS = 'post/CLEAR_POSTS';
const [
  GET_ALL_POSTS,
  GET_ALL_POSTS_SUCCEESS,
  GET_ALL_POSTS_FAILURE,
] = createActionTypes('post/GET_ALL_POSTS');
const [
  GET_MAINPAGE_DATA,
  GET_MAINPAGE_DATA_SUCCESS,
  GET_MAINPAGE_DATA_FAILURE,
] = createActionTypes('post/GET_MAINPAGE_DATA');

const [
  GET_SEARCHRESULTS,
  GET_SEARCHRESULTS_SUCCEESS,
  GET_SEARCHRESULTS_FAILURE,
] = createActionTypes('search/GET_SEARCHRESULTS');

export const getAllPosts = createRequestThunk(GET_ALL_POSTS, Post.getAllPosts);
export const clearPosts = createAction(CLEAR_POSTS);
export const getMainpageData = createRequestThunk(
  GET_MAINPAGE_DATA,
  Post.getMainPageData,
);
export const getSearchResults = createRequestThunk(
  GET_SEARCHRESULTS,
  Post.getSearchResults,
);

const initialState = {
  posts: [],
  post: null,
  error: null,
  pageData: null, // mainpage의 포스트 제외 기타 데이터들
};

const post = handleActions(
  {
    [GET_ALL_POSTS_SUCCEESS]: (state, { payload: { data } }) => ({
      ...state,
      posts: data.slice(0, 40), // FIXME: 나중에 페이지네이션 해야함
      error: null,
    }),
    [GET_ALL_POSTS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      posts: [],
      error,
    }),
    [CLEAR_POSTS]: (state) => ({
      ...state,
      posts: [],
      pageData: null,
    }),
    [GET_MAINPAGE_DATA_SUCCESS]: (
      state,
      { payload: { data, company_count, posts_count } },
    ) => ({
      ...state,
      posts: data,
      pageData: {
        companyCount: company_count,
        postsCount: posts_count,
      },
      error: null,
    }),
    [GET_MAINPAGE_DATA_FAILURE]: (state, { payload: error }) => ({
      ...state,
      posts: [],
      pageData: null,
      error,
    }),
    [GET_SEARCHRESULTS_SUCCEESS]: (state, { payload: { data } }) => ({
      ...state,
      posts: data,
      error: null,
    }),
    [GET_SEARCHRESULTS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      posts: [],
      error,
    }),
  },
  initialState,
);

export default post;
