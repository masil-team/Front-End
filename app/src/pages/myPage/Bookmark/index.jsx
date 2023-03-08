import React from 'react';
import styles from './style.module.css';
import Infinite from '../../../components/Infinite';
const BookMark = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <Infinite />
      </div>
    </section>
  );
};

export default BookMark;
