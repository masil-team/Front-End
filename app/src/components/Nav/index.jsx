import React from 'react';
import styles from './style.module.css';
import Search from './Search';
import UserInfo from './UserInfo';
<<<<<<< HEAD

const Index = () => {
  return (
    <nav className={styles.nav}>
      <div className={styles.container}>
        <div className={styles.logo}>
=======
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
>>>>>>> 478e21e1a72341f1477fd1c9bcbf0e7b24cd9a79
          <img src={`${process.env.PUBLIC_URL}/images/logo.png`} alt="" />
        </div>
        <Search></Search>
        <UserInfo></UserInfo>
      </div>
    </nav>
  );
};

export default Index;
