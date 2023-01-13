import React from 'react';
import styles from './style.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';

const Index = () => {
  return (
    <form className={styles.form}>
      <div className={styles.search}>
        <button className={styles.btn}>
          <FontAwesomeIcon icon={faSearch} />
        </button>
        <input type="text" placeholder="검색어를 입력하세요" />
      </div>
    </form>
  );
};

export default Index;
