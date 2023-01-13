import React from 'react';
import Form from './Form';
import styles from './style.module.css';
import Social from './Social';

const Login = () => {
  return (
    <div className={styles.container}>
      <div className={styles.loginContainer}>
        <div className={styles.navBox}>
          <h1 className={styles.loginH1}>로그인</h1>
          <div className={styles.imageBox}></div>
        </div>
        <span className={styles.span}>오늘부터 당신의 생각을 세상과 공유하세요</span>
        <section className={styles.sectionForm}>
          <Form />
        </section>
        <section className={styles.sectionSocial}>
          <Social></Social>
        </section>
      </div>
    </div>
  );
};

export default Login;
