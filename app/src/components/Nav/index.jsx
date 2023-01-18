import React from 'react';
import styles from './style.module.css';
import Search from './Search';
import UserInfo from './UserInfo';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../constants/path';

const Index = () => {
  const navigate = useNavigate();
  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <div
          className={styles.logo}
          onClick={() => {
            navigate(PATH.MAIN);
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
