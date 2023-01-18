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
          <span className={styles.span1}>K</span>
          <span className={styles.span2}>Kakao</span>
        </div>
        <div className={styles.btn}>
          <span className={styles.span1}>G</span>
          <span className={styles.span2}>Google</span>
        </div>
        <div className={styles.btn}>
          <span className={styles.span1}>N</span>
          <span className={styles.span2}>Naver</span>
        </div>
      </div>
    </>
  );
};

export default Social;
