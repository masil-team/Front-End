import React, { useEffect } from 'react';
import styles from './style.module.css';
import Infinite from '../../../components/Infinite';
import PropTypes from 'prop-types';
const BookMark = ({ postList, setPostList }) => {
  useEffect(() => {}, []);
  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <Infinite postList={postList} setPostList={setPostList} />
      </div>
    </section>
  );
};

BookMark.propTypes = {
  postList: PropTypes.array,
  setPostList: PropTypes.func,
};

export default BookMark;
