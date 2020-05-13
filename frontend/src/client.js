import axios from 'axios';

const client = axios.create();

client.defaults.baseURL = 'http://localhost:8000';

// 기본적으로 API를 요청할때 , 토큰 존재시 헤더에 붙여주는 로직
/**
  let token = localStorage.getItem('token') || null;
  if (token) {
    client.defaults.headers.common['Authorization'] = token;
  }  
 */

export default client;
