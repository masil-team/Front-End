import React, { useRef, useState } from 'react';
import styles from './style.module.css';
import Nav from '../../components/Nav';
import Location from './Location';
import Post from './Post';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router';

export const Main = () => {
  const nav = useNavigate();
  const target = useRef(); //옵저버 타겟
  const [newData, setNewData] = useState(); //게시글 삭제시 삭제된 게시글 제외 하고 나머지 게시글 목록 새로 저장
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
          <Post target={target} newData={newData} setNewData={setNewData}></Post>
          <button ref={target}>Load More</button>
        </div>
      </section>
    </>
  );
};

export default Main;
