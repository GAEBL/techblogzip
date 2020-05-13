import client from '../client';

/**
 * 예시
 */
export const Auth = {
  login: ({ username, password }) =>
    client.post('/api/auth/login', {
      username,
      password,
    }),
  register: ({ username, password, company }) =>
    client.post('/api/auth/register', {
      username,
      password,
      company,
    }),
  // 로그인 상태 확인
  check: (token) =>
    client.get('/api/auth/check', {
      headers: { Authorization: token },
    }),
};
