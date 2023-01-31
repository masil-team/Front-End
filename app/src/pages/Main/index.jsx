import React from 'react';
import styles from './style.module.css';
import Nav from '../../components/Nav';
import Location from './Location';
import Post from './Post';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router';

export const Main = () => {
  const nav = useNavigate();
  return (
    <>
      <Nav></Nav>
      <section className={styles.section}>
        <div className={styles.container}>
          <Location></Location>
          <div className={styles.top_nav}>
            <div className={styles.category}>
              <ul>
                <li>
                  <em>전체</em>
                </li>
                <li>
                  <em>동네소식</em>
                </li>
                <li>
                  <em>동네질문</em>
                </li>
                <li>
                  <em>일상</em>
                </li>
                <li>
                  <em>분실/실종</em>
                </li>
              </ul>
            </div>
            <div className={styles.writing}>
              <button onClick={() => nav('/createPost')} className={styles.btn}>
                <FontAwesomeIcon icon={faPlus} className={styles.icon} />
                <em>글쓰기</em>
              </button>
            </div>
          </div>
          <Post></Post>
        </div>
      </section>
    </>
  );
};

export default Main;
