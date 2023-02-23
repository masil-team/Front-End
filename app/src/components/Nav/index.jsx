import React from 'react';
import styles from './style.module.css';
import Search from './Search';
import UserInfo from './UserInfo';
import { useLocation, useNavigate } from 'react-router-dom';
import { PATH } from '../../constants/path';
import sessionReset from '../../utils/sessionReset';
//import { BASE_URL } from '../../constants/api';

const Index = () => {
  const navigate = useNavigate();
  const urlAddress = useLocation();
  /*
  let accessToken = sessionStorage.getItem('accessToken');

  //sse 단방향 통신
  useEffect(() => {
    if (accessToken) {
      let eventSource;
      const fetchSse = async () => {
        try {
          eventSource = new EventSource(`${BASE_URL}/sse`, {
            headers: {
              Authorization: sessionStorage.getItem('accessToken'),
            },
            withCredentials: true,
          });
          eventSource.onmessage = async event => {
            const res = await event.data;
            console.log('받은 정보', res);
          };
          eventSource.onerror = async event => {
            console.log('see에러', event);
            eventSource.close();
          };
        } catch (error) {
          console.log(error);
        }
      };
      fetchSse();
      return () => eventSource.close();
    }
  });
  */

  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <div
          className={styles.logo}
          onClick={() => {
            navigate(PATH.MAIN);
            sessionReset(urlAddress.pathname);
          }}
        >
          <img src={`${process.env.PUBLIC_URL}/images/logo.png`} alt="" />
        </div>
        <Search></Search>
        <UserInfo></UserInfo>
      </div>
    </nav>
  );
};

export default Index;
