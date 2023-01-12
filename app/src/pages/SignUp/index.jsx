import React from 'react';
import styles from './style.module.css';
import { useNavigate } from 'react-router-dom';
import Form from './Form';
import { PATH } from '../../constants/path';

export const SignUp = () => {
  let navigate = useNavigate();

  return (
    <div>
      <nav className={styles.join_nav}>
        <em
          onClick={() => {
            navigate(PATH.MAIN);
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
