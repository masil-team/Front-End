import React, { useEffect } from 'react';
import styles from './style.module.css';
import Infinite from '../../../components/Infinite';

const BookMark = () => {
  useEffect(() => {}, []);
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <Infinite />
      </div>
    </section>
  );
};

export default BookMark;
