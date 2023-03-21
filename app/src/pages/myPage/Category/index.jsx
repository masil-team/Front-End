import React from 'react';
import {
  faThumbsUp,
  faBookmark,
  faUser,
  faBars,
  faClose,
  faBell,
  faBookOpen,
  faCommentAlt,
  faHeart,
} from '@fortawesome/free-solid-svg-icons';
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
  const newsMatch = useMatch('/mypage/news');
  const commentMatch = useMatch('/mypage/mycomment');
  const postMatch = useMatch('/mypage/mypost');
  const comment_like_match = useMatch('/mypage/commentlikes');
  return (
    <>
      {width > 780 ? (
        <div className={styles.categoryContainer}>
          <div
            onClick={() => {
              nav('/mypage/bookmark');
              sessionStorage.removeItem('myPageList');
            }}
            className={styles.categoryitem}
          >
            <div>
              <FontAwesomeIcon icon={faBookmark} />
              <span className={styles.categoryspan}>북마크</span>
            </div>
            {bookMatch && <motion.div className={styles.circle} layoutId="1" />}
          </div>
          <div
            onClick={() => {
              nav('/mypage/like');
              sessionStorage.removeItem('myPageList');
            }}
            className={styles.categoryitem}
          >
            <div>
              <FontAwesomeIcon icon={faThumbsUp} />
              <span className={styles.categoryspan}>좋아요</span>
            </div>
            {likeMatch && <motion.div className={styles.circle} layoutId="1" />}
          </div>
          <div
            onClick={() => {
              nav('/mypage/profile');
              sessionStorage.removeItem('myPageList');
            }}
            className={styles.categoryitem}
          >
            <div>
              <FontAwesomeIcon icon={faUser} />
              <span className={styles.categoryspan}>회원정보변경</span>
            </div>
            {profileMatch && <motion.div className={styles.circle} layoutId="1" />}
          </div>
          <div
            onClick={() => {
              nav('/mypage/news');
              sessionStorage.removeItem('myPageList');
            }}
            className={styles.categoryitem}
          >
            <div>
              <FontAwesomeIcon icon={faBell} />
              <span className={styles.categoryspan}>내 소식</span>
            </div>
            {newsMatch && <motion.div className={styles.circle} layoutId="1" />}
          </div>
          <div
            onClick={() => {
              nav('/mypage/mypost');
              sessionStorage.removeItem('myPageList');
            }}
            className={styles.categoryitem}
          >
            <div>
              <FontAwesomeIcon icon={faBookOpen} />
              <span className={styles.categoryspan}>나의 글</span>
            </div>
            {postMatch && <motion.div className={styles.circle} layoutId="1" />}
          </div>
          <div
            onClick={() => {
              nav('/mypage/mycomment');
              sessionStorage.removeItem('myPageList');
            }}
            className={styles.categoryitem}
          >
            <div>
              <FontAwesomeIcon icon={faCommentAlt} />
              <span className={styles.categoryspan}>내 댓글</span>
            </div>
            {commentMatch && <motion.div className={styles.circle} layoutId="1" />}
          </div>
          <div
            onClick={() => {
              nav('/mypage/commentlikes');
              sessionStorage.removeItem('myPageList');
            }}
            className={styles.categoryitem}
          >
            <div>
              <FontAwesomeIcon icon={faHeart} />
              <span className={styles.categoryspan}>좋아요한 댓글</span>
            </div>
            {comment_like_match && <motion.div className={styles.circle} layoutId="1" />}
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
                sessionStorage.removeItem('myPageList');
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
                sessionStorage.removeItem('myPageList');
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
                sessionStorage.removeItem('myPageList');
              }}
              className={styles.mobileItem}
            >
              <div className={styles.categoryMobileDiv}>
                <FontAwesomeIcon style={{ marginRight: '10px' }} icon={faUser} />
                <span className={styles.categoryMobileSpan}>회원정보변경</span>
              </div>
              {profileMatch && <motion.div className={styles.mobileCircle} layoutId="1" />}
            </div>
            <div
              onClick={() => {
                nav('/mypage/news');
                setShow(prev => !prev);
                sessionStorage.removeItem('myPageList');
              }}
              className={styles.mobileItem}
            >
              <div>
                <FontAwesomeIcon icon={faBell} />
                <span className={styles.categoryspan}>내 소식</span>
              </div>
              {newsMatch && <motion.div className={styles.circle} layoutId="1" />}
            </div>
            <div
              onClick={() => {
                nav('/mypage/mypost');
                setShow(prev => !prev);
                sessionStorage.removeItem('myPageList');
              }}
              className={styles.mobileItem}
            >
              <div>
                <FontAwesomeIcon icon={faBookOpen} />
                <span className={styles.categoryspan}>나의 글</span>
              </div>
              {postMatch && <motion.div className={styles.circle} layoutId="1" />}
            </div>
            <div
              onClick={() => {
                nav('/mypage/mycomment');
                setShow(prev => !prev);
                sessionStorage.removeItem('myPageList');
              }}
              className={styles.mobileItem}
            >
              <div>
                <FontAwesomeIcon icon={faCommentAlt} />
                <span className={styles.categoryspan}>내 댓글</span>
              </div>
              {commentMatch && <motion.div className={styles.circle} layoutId="1" />}
            </div>
            <div
              onClick={() => {
                nav('/mypage/commentlikes');
                setShow(prev => !prev);
                sessionStorage.removeItem('myPageList');
              }}
              className={styles.mobileItem}
            >
              <div>
                <FontAwesomeIcon icon={faHeart} />

                <span className={styles.categoryspan}>좋아요한 댓글</span>
              </div>
              {comment_like_match && <motion.div className={styles.circle} layoutId="1" />}
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
