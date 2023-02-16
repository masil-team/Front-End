import React from 'react';
import styles from './style.module.css';
import Nav from '../../components/Nav';
import { Outlet, useMatch, useNavigate } from 'react-router-dom';
import { faThumbsUp, faBookmark, faUser } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const MyPage = () => {
  const nav = useNavigate();
  const bookMatch = useMatch('/mypage/bookmark');
  const profileMatch = useMatch('/mypage/profile');
  const likeMatch = useMatch('/mypage/like');
  return (
    <>
      <Nav />
      <div className={styles.container}>
        <div className={styles.innerContainer}>
          <div className={styles.categoryContainer}>
            <div onClick={() => nav('/mypage/bookmark')} className={styles.categoryitem}>
              <div>
                <FontAwesomeIcon icon={faBookmark} />
                <span className={styles.categoryspan}>북마크</span>
              </div>
              {bookMatch && <motion.div className={styles.circle} layoutId="1" />}
            </div>
            <div onClick={() => nav('/mypage/like')} className={styles.categoryitem}>
              <div>
                <FontAwesomeIcon icon={faThumbsUp} />
                <span className={styles.categoryspan}>좋아요</span>
              </div>
              {likeMatch && <motion.div className={styles.circle} layoutId="1" />}
            </div>
            <div onClick={() => nav('/mypage/profile')} className={styles.categoryitem}>
              <div>
                <FontAwesomeIcon icon={faUser} />
                <span className={styles.categoryspan}>회원정보변경</span>
              </div>
              {profileMatch && <motion.div className={styles.circle} layoutId="1" />}
            </div>
          </div>
          <div className={styles.outletContainer}>
            <Outlet />
          </div>
        </div>
      </div>
    </>
  );
};

export default MyPage;
