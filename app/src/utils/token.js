import Axios from 'axios';
import { getCookie, removeCookie } from './cookie';

const axios = Axios.create({
  baseURL: 'http://13.209.94.72:8080', //API기본 주소
});

axios.interceptors.request.use(
  function (config) {
    const accessToken = sessionStorage.getItem('accessToken'); // 쿠키에 있는 refreshToken 토큰을 가지고 오기
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
    }
    return config;
  },
  function (error) {
    return Promise.reject(error);
  },
);
// AccessToken이 만료됐을때 처리
axios.interceptors.response.use(
  function (response) {
    return response;
  },
  async function (err) {
    const originalConfig = err.config;
    if (err.response.data.code === 6001) {
      try {
        if (err.response.data.message === 'accessToken이 지급되지 않았습니다') {
          throw Error('새로고침 필요');
        }
        let refreshToken = getCookie('refreshToken'); // 쿠키에 있는 refreshToken 토큰을 가지고 오기
        let accessToken = sessionStorage.getItem('accessToken'); // 세션스토리지에 있는 accessToken 토큰을 가지고 오기
        const res = await Axios({
          url: `http://13.209.94.72:8080/auth/reissue`, //refreshToken 토큰 요청하는 API주소
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          data: {
            accessToken,
            refreshToken,
          },
          withCredentials: true,
        });
        console.log(JSON.stringify(res));
        let a = JSON.stringify(res);
        a = JSON.parse(a);
        console.log(a);

        if (res.status === 200) {
          console.log(`reissue 이후 ${res.data.accessToken}`);
          sessionStorage.setItem('accessToken', res.data.accessToken);
          return await axios.request(originalConfig);
        }
      } catch (err) {
        console.log('토큰 갱신 에러', err);
        localStorage.clear();
        sessionStorage.clear();
        removeCookie('refreshToken');
      }
      return Promise.reject(err);
    }
    return Promise.reject(err);
  },
);

export default axios;
