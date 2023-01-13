import React from 'react';
import styles from './style.module.css';

const Social = () => {
  return (
    <>
      <div className={styles.nameTag}>
        <span>소셜 로그인</span>
      </div>
      <div className={styles.socialBtnContainer}>
        <div className={styles.btn}>
          <div>K</div>
          <span>kakao</span>
        </div>
        <div className={styles.btn}></div>
        <div className={styles.btn}></div>
      </div>
    </>
  );
};

export default Social;
