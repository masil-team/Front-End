import React from 'react';
import styles from './style.module.css';
import Nav from '../../components/Nav';
import Location from './Location';

export const Main = () => {
  return (
    <>
      <Nav></Nav>
      <section className={styles.section}>
        <div className={styles.container}>
          <Location></Location>
        </div>
      </section>
    </>
  );
};

export default Main;
