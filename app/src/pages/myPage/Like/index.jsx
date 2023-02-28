import React from 'react';
import Infinite from '../../../components/Infinite';
import styles from './style.module.css';
const Like = () => {
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <Infinite />
      </div>
    </section>
  );
};

export default Like;
