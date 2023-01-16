import React from 'react';
import styles from './style.module.css';
import Search from './Search';
import UserInfo from './UserInfo';

const Index = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <div className={styles.logo}>
          <img src={`${process.env.PUBLIC_URL}/images/logo.png`} alt="" />
        </div>
        <Search></Search>
        <UserInfo></UserInfo>
      </div>
    </nav>
  );
};

export default Index;
