import React, { useEffect } from 'react';
import styles from './style.module.css';
import Search from './Search';
import UserInfo from './UserInfo';
import { useLocation, useNavigate } from 'react-router-dom';
import { PATH } from '../../constants/path';
import sessionReset from '../../utils/sessionReset';
import { BASE_URL } from '../../constants/api';
import { NativeEventSource, EventSourcePolyfill } from 'event-source-polyfill';
import { useState } from 'react';

const Index = () => {
  const navigate = useNavigate();
  const urlAddress = useLocation();

  let accessToken = sessionStorage.getItem('accessToken');
  const EventSource = EventSourcePolyfill || NativeEventSource;

  const [alert, setAlert] = useState(); //실시간 알림 표시

  // sse 단방향 통신
  useEffect(() => {
    if (accessToken) {
      let eventSource;
      const fetchSse = async () => {
        try {
          eventSource = new EventSource(`${BASE_URL}/sse`, {
            headers: {
              Authorization: `Bearer ${sessionStorage.getItem('accessToken')}`,
            },
            withCredentials: true,
          });
          eventSource.onmessage = async event => {
            const res = await event.data;
            console.log('sse받은 값', res);
            setAlert(res);
          };
          eventSource.onerror = async event => {
            console.log('sse에러', event);
            eventSource.close();
          };
        } catch (error) {
          console.log(error);
        }
      };
      fetchSse();
      return () => eventSource.close();
    }
  }, []);

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
        <UserInfo alert={alert}></UserInfo>
      </div>
    </nav>
  );
};

export default Index;
