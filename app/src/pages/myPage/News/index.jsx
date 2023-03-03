import React, { useState } from 'react';
import styles from './style.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const News = () => {
  const item = Array.from({ length: 33 }, (v, i) => i + 1);
  const offset = 5;
  const [page, setPage] = useState(0);
  let totalPages = Math.round(item.length / offset);
  const pages = Array.from({ length: totalPages }, (v, i) => i + 1);
  const nav = useNavigate();
  return (
    <div className={styles.container}>
      <div className={styles.NameBox}>
        <h1 className={styles.h1}>내 소식</h1>
      </div>
      <ul className={styles.ulbox}>
        {item.slice(offset * page, offset * page + offset).map(i => (
          <li onClick={() => nav('#')} className={styles.list} key={i}>
            <div>
              <div className={styles.tag}>
                <div className={styles.photo}></div>
                <div className={styles.content}>
                  <span>{i}</span>
                  <span>time</span>
                </div>
              </div>
              <div className={styles.icon}>
                <FontAwesomeIcon className={styles.images} icon={faMessage} />
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className={styles.pagebox}>
        {pages.map(i => (
          <li onClick={() => setPage(i - 1)} key={i + 100}>
            {i}
          </li>
        ))}
      </div>
    </div>
  );
};

export default News;
