import React from 'react';
import styles from './style.module.css';
import Search from './Search';
import UserInfo from './UserInfo';
import { useLocation, useNavigate } from 'react-router-dom';
import { PATH } from '../../constants/path';
import sessionReset from '../../utils/sessionReset';
import axios from '../../utils/token';
import { BASE_URL } from '../../constants/api';
import { useEffect } from 'react';

const Index = () => {
  const navigate = useNavigate();
  const urlAddress = useLocation();

  const handleUserIfo = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/members/login-user`);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleUserIfo();
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
        <UserInfo></UserInfo>
      </div>
    </nav>
  );
};

export default Index;
