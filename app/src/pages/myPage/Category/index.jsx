import React from 'react';
import { faThumbsUp, faBookmark, faUser, faBars, faClose } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import styles from './style.module.css';
import { useMatch, useNavigate } from 'react-router-dom';
import PropTypes from 'prop-types';
const moving = {
  initial: {
    x: 0,
  },
  animate: show => ({
    x: show ? 0 : '-79%',
    transition: { duration: 0.6, delay: 0.4 },
  }),
  exit: {
    x: 0,
  },
};

const Category = ({ width, show, setShow }) => {
  const nav = useNavigate();
  const bookMatch = useMatch('/mypage/bookmark');
  const profileMatch = useMatch('/mypage/profile');
  const likeMatch = useMatch('/mypage/like');
  return (
    <>
      {width > 780 ? (
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
      ) : (
        <motion.div
          variants={moving}
          custom={show}
          initial="initial"
          animate="animate"
          exit="exit"
          className={styles.mobileContainer}
        >
          <div className={styles.mobileMenu}>
            <div
              onClick={() => {
                nav('/mypage/bookmark');
                setShow(prev => !prev);
              }}
              className={styles.mobileItem}
            >
              <div className={styles.categoryMobileDiv}>
                <FontAwesomeIcon style={{ marginRight: '10px' }} icon={faBookmark} />
                <span className={styles.categoryMobileSpan}>북마크</span>
              </div>
              {bookMatch && <motion.div className={styles.mobileCircle} layoutId="1" />}
            </div>
            <div
              onClick={() => {
                nav('/mypage/like');
                setShow(prev => !prev);
              }}
              className={styles.mobileItem}
            >
              <div className={styles.categoryMobileDiv}>
                <FontAwesomeIcon style={{ marginRight: '10px' }} icon={faThumbsUp} />
                <span className={styles.categoryMobileSpan}>좋아요</span>
              </div>
              {likeMatch && <motion.div className={styles.mobileCircle} layoutId="1" />}
            </div>
            <div
              onClick={() => {
                nav('/mypage/profile');
                setShow(prev => !prev);
              }}
              className={styles.mobileItem}
            >
              <div className={styles.categoryMobileDiv}>
                <FontAwesomeIcon style={{ marginRight: '10px' }} icon={faUser} />
                <span className={styles.categoryMobileSpan}>회원정보변경</span>
              </div>
              {profileMatch && <motion.div className={styles.mobileCircle} layoutId="1" />}
            </div>
          </div>
          <div className={styles.mobileMenuIcon}>
            <FontAwesomeIcon icon={show ? faClose : faBars} onClick={() => setShow(prev => !prev)} />
          </div>
        </motion.div>
      )}
    </>
  );
};
Category.propTypes = {
  width: PropTypes.number,
  show: PropTypes.bool,
  setShow: PropTypes.func,
};

export default Category;
