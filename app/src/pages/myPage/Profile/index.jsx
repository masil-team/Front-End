import React from 'react';
import styles from './style.module.css';

const Profile = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>회원정보 변경</h1>
      <div className={styles.image}></div>
      <button className={styles.imageBtn}>프로필변경</button>
    </div>
  );
};

export default Profile;
