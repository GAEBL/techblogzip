import client from '../client';

/**
 * 예시
 */
export const Auth = {
  login: ({ username, password }) =>
    client.post('/auth/login/', {
      username,
      password,
    }),
  register: ({ username, password, email, is_subscribed }) =>
    client.post('/auth/signup/', {
      username,
      password,
      email,
      is_subscribed,
    }),
  // 로그인 상태 확인 => token 은 기본으로 들가게끔 해놓음
  check: () => client.get('/auth/check/'),
};
