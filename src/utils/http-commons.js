import axios from 'axios';
// axios.defaults.withCredentials = true; // withCredentials 전역 설정
const localAxios = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  headers: {
    'Content-Type': 'application/json;charset=utf-8',
  },
});

const jwtAxios = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
});

export { localAxios, jwtAxios };
