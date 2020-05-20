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

export const getAllPosts = createRequestThunk(GET_ALL_POSTS, Post.getAllPosts);
export const clearPosts = createAction(CLEAR_POSTS);
export const getMainpageData = createRequestThunk(
  GET_MAINPAGE_DATA,
  Post.getMainPageData,
);

const initialState = {
  posts: [],
  post: null,
  error: null,
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
    }),
    [GET_MAINPAGE_DATA_SUCCESS]: (state, action) => ({
      ...state,
      posts: [], // FIXME: 나중에 오는 데이터 보고 수정할것
      error: null,
    }),
    [GET_MAINPAGE_DATA_FAILURE]: (state, { payload: error }) => ({
      ...state,
      posts: [],
      error,
    }),
  },
  initialState,
);

export default post;
