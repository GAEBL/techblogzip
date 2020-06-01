import { setAuthorization } from './client';
import { check } from './reducers/user';

// 미들웨어는 여기서 추가
const AddAuthorizationMiddleware = (store) => (next) => (action) => {
  // API 요청시!!
  if (action.type === 'loading/START_LOADING') {
    setAuthorization();
  }
  return next(action);
};

const setAuthInfo = (store) => (next) => (action) => {
  // 로그인 & 회원가입 성공시
  if (
    action.type === 'auth/LOGIN_SUCCESS' ||
    action.type === 'auth/REGISTER_SUCCESS'
  ) {
    const { token } = action.payload;
    sessionStorage.setItem('jwt', token); // 토큰 설정 후
    store.dispatch(check());
  }

  // 임시 로그인 부분을 위한 저장
  if (
    action.type === 'auth/LOGIN_SUCCESS' ||
    action.type === 'auth/REGISTER_SUCCESS' ||
    action.type === 'user/CHECK_SUCCESS'
  ) {
    const { user } = action.payload;
    localStorage.setItem('user', JSON.stringify(user));
  }

  // 토큰 인증 실패 & 로그아웃
  if (action.type === 'user/CHECK_FAILURE' || action.type === 'user/LOGOUT') {
    sessionStorage.removeItem('jwt'); // 토큰 설정 후
    localStorage.removeItem('user');
  }
  return next(action);
};

export { AddAuthorizationMiddleware, setAuthInfo };
