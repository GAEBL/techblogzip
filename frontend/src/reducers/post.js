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
] = createActionTypes('post/GET_SEARCHRESULTS');

const [POST_LIKE, POST_LIKE_SUCCEESS, POST_LIKE_FAILURE] = createActionTypes(
  'post/POST_LIKE',
);

const [
  GET_POSTS_BY_TAG,
  GET_POSTS_BY_TAG_SUCCESS,
  GET_POSTS_BY_TAG_FAILURE,
] = createActionTypes('post/GET_POSTS_BY_TAG');

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
export const postLike = createRequestThunk(POST_LIKE, Post.postLike);
export const getPostsByTag = createRequestThunk(
  GET_POSTS_BY_TAG,
  Post.getPostsByRelatedTag,
);

const initialState = {
  posts: [],
  lastPage: null,
  resultNum: null,
  post: null,
  error: null,
  pageData: null, // mainpage의 포스트 제외 기타 데이터들
};

const post = handleActions(
  {
    [CLEAR_POSTS]: (state) => ({
      ...state,
      posts: [],
      lastPage: null,
      resultNum: null,
      pageData: null,
    }),
    [GET_ALL_POSTS_SUCCEESS]: (state, { payload: { data, lastPage } }) => ({
      ...state,
      posts: data, // FIXME: 나중에 페이지네이션 해야함
      lastPage: lastPage,
      error: null,
    }),
    [GET_ALL_POSTS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      posts: [],
      error,
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
    [GET_SEARCHRESULTS_SUCCEESS]: (
      state,
      { payload: { data, lastPage, resultNum } },
    ) => ({
      ...state,
      posts: data,
      lastPage,
      resultNum,
      error: null,
    }),
    [GET_SEARCHRESULTS_FAILURE]: (state, { payload: error }) => ({
      ...state,
      posts: [],
      error,
    }),
    [POST_LIKE_SUCCEESS]: (state, action) => ({
      ...state,
    }),
    [POST_LIKE_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
    [GET_POSTS_BY_TAG_SUCCESS]: (
      state,
      { payload: { lastPage, resultNum, data } },
    ) => ({
      ...state,
      posts: data,
      lastPage,
      resultNum,
      error: null,
    }),
    [GET_POSTS_BY_TAG_FAILURE]: (state, { payload: error }) => ({
      ...state,
      error,
    }),
  },
  initialState,
);

export default post;
