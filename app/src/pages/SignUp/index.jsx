import React from 'react';
import styles from './style.module.css';
import { useLocation, useNavigate } from 'react-router-dom';
import Form from './Form';
import { PATH } from '../../constants/path';
import sessionReset from '../../utils/sessionReset';

export const SignUp = () => {
  let navigate = useNavigate();
  const urlAddress = useLocation();

  return (
    <div>
      <nav className={styles.join_nav}>
        <em
          onClick={() => {
            navigate(PATH.MAIN);
            sessionReset(urlAddress.pathname);
          }}
        >
          마실
        </em>
      </nav>
      <section className={styles.section}>
        <Form></Form>
      </section>
    </div>
  );
};

export default SignUp;
