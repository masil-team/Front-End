import React from 'react';
import styles from './style.module.css';
import Search from './Search';
import UserInfo from './UserInfo';
import { useLocation, useNavigate } from 'react-router-dom';
import { PATH } from '../../constants/path';
import sessionReset from '../../utils/sessionReset';

const Index = () => {
  const navigate = useNavigate();
  const urlAddress = useLocation();

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
