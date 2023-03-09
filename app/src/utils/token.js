import Axios from 'axios';
import { getCookie, removeCookie } from './cookie';
import { PATH } from '../constants/path';
import { BASE_URL } from '../constants/api';
const axios = Axios.create({
  baseURL: BASE_URL, //API기본 주소
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
          url: `${BASE_URL}/auth/reissue`, //refreshToken 토큰 요청하는 API주소
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
        if (res.status === 200) {
          sessionStorage.setItem('accessToken', res.data.accessToken);
          return await axios.request(originalConfig);
        }
      } catch (err) {
        console.log(err);
        if (err.response.data.code === 6003 || err.response.data.code === 6005) {
          console.log(err);
          sessionStorage.removeItem('accessToken');
          removeCookie('refreshToken');
          history.pushState(null, null, location.origin + PATH.LOGIN);
          // window.location.reload();
        }
      }
      return Promise.reject(err);
    }
    return Promise.reject(err);
  },
);

export default axios;
