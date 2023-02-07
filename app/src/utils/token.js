import Axios from 'axios';
import { getCookie, removeCookie } from './cookie';

const axios = Axios.create({
  baseURL: 'http://13.209.94.72:8080', //API기본 주소
});

axios.interceptors.request.use(
  function (config) {
    const refreshToken = getCookie('refreshToken'); // 쿠키에 있는 refreshToken 토큰을 가지고 오기
    if (refreshToken) {
      config.headers.Authorization = `Bearer ${refreshToken}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);
//AccessToken이 만료됐을때 처리
axios.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (err) {
    const originalConfig = err.config;
    if (err.response.status === 401) {
      try {
        if (err.response.data.message === 'accessToken이 지급되지 않았습니다') {
          throw Error('새로고침 필요');
        }
        let refreshToken = getCookie('refreshToken'); // 쿠키에 있는 refreshToken 토큰을 가지고 오기
        let accessToken = sessionStorage.getItem('accessToken'); // 세션스토리지에 있는 accessToken 토큰을 가지고 오기
        const data = await Axios({
          url: `http://13.209.94.72:8080/auth/reissue`, //refreshToken 토큰 요청하는 API주소
          method: 'POST',
          headers: {
            authorization: accessToken,
            refresh: refreshToken,
          },
        });
        if (data) {
          getCookie('refreshToken', JSON.stringify(data.data.data.refreshToken));
          return await axios.request(originalConfig);
        }
      } catch (err) {
        console.log('토큰 갱신 에러', err);
        localStorage.clear();
        sessionStorage.clear();
        removeCookie('refreshToken');
        window.location.reload();
      }
      return Promise.reject(err);
    }
    return Promise.reject(err);
  },
);

export default axios;
