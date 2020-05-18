import {createAction, handleActions} from 'redux-actions';
import immer from 'immer';
import createRequestSaga, {
	createRequestActionTypes,
  } from '../lib/createRequestSaga';
import { takeLatest } from 'redux-saga/effects';
import { RecentPost } from '../api/recentpost';

const CHOOSE_SORT = 'recentpost/CHOOSE_SORT';
const CHOOSE_COMPANY = 'recentpost/CHOOSE_COMPANY';
const GET_RECENT_POST = 'recentpost/GET_RECENT_POST';
const GET_RECENT_POST_SUCCESS = 'recentpost/GET_RECENT_POST_SUCCESS';
const GET_RECENT_POST_FAILURE = 'recentpost/GET_RECENT_POST_FAILURE';

export const chooseSorting = createAction(CHOOSE_SORT, id=>id);
export const chooseCompany = createAction(CHOOSE_COMPANY, id=>id);
export const initialRecentPost = createAction(INITIAL_RECENT_POST, (posts)=>posts);
export const getPost = createAction(GET_POST, ({company, sort}) => {company, sort})

// function getRecentPostSaga(action){
// 	yield put(startLoading(GET_RECENT_POST));	// 로딩 시작
// 	try {
// 		const post = yield call(RecentPost.getpost, action.payload);
// 		yield put({
// 			type: GET_RECENT_POST_SUCCESS,
// 			payload: post.data
// 		});
// 	} catch (e){
// 		yield put({
// 			tyle: GET_RECENT_POST_FAILURE,
// 			payload: e,
// 			error: true,
// 		});
// 	}
// 	yield put(finishLoading(GET_POST));	// 로딩 완료
// }
const getRecentPostSaga = createRequestSaga(GET_RECENT_POST, RecentPost.getpost);


const initialState = {
	posts: null,
	company: null, // 빈칸: 전체 else 회사글만 필터링
	sort: null,	// 빈칸: 최신, likes: 좋아요, user_recommadation: 유저맞춤 정렬
}

const recentpost = handleActions(
	{
		[CHOOSE_SORT]: (state, action) => ({
			...state,
			sort: action.payload
		}),
		[CHOOSE_COMPANY]: (state, action) => ({
			...state,
			company: action.payload
		}),
		// 포스트 글 가져오기 성공
		[GET_RECENT_POST_SUCCESS]: (state, action) => ({
			...state,
			post: action.payload
		}),
		initialState
	}
)

export default recentpost;