import { startLoading, finishLoading } from '../reducers/loading';

export default function createRequestThunk(type, request) {
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;
  return (params) => async (dispatch) => {
    // 1. 해당 액션 스타트
    dispatch({ type });

    // 2. 로딩 true
    dispatch(startLoading(type));

    try {
      // 요청후
      const response = await request(params);

      // 성공시
      dispatch({
        type: SUCCESS,
        payload: response.data,
      });
    } catch (e) {
      // 실패시
      dispatch({
        type: FAILURE,
        payload: e,
        error: true,
      });
      // 에러 던진다.
      throw e;
    } finally {
      // 마지막으로 로딩 false
      dispatch(finishLoading(type));
    }
  };
}
