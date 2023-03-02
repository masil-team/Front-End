import React from 'react';
import styles from './style.module.css';

const News = () => {
  console.log('hello im News');
  return (
    <div className={styles.container}>
      <div className={styles.NameBox}>
        <h1 className={styles.h1}>내 소식</h1>
      </div>
    </div>
  );
};

export default News;
