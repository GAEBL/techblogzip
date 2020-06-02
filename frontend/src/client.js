import axios from 'axios';

const client = axios.create();

// LOCAL
client.defaults.baseURL = 'http://k02c1031.p.ssafy.io:8000';

// PRODUCT
// 기본적으로 API를 요청할때 , 토큰 존재시 헤더에 붙여주는 로직
export function setAuthorization() {
  let token = sessionStorage.getItem('jwt') || null;
  if (token) {
    client.defaults.headers.common['Authorization'] = `JWT ${token}`;
  } else {
    delete client.defaults.headers.common['Authorization'];
  }
}

export default client;
