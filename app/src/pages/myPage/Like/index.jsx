import React from 'react';
import Card from './Card';
import styles from './style.module.css';
const Like = () => {
  const postList = JSON.parse(sessionStorage.getItem('postList'));
  console.log(postList);
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <Card postList={postList} />
      </div>
    </section>
  );
};

export default Like;
