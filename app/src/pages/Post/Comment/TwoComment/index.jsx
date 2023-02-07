import React from 'react';
import PropTypes from 'prop-types';
import styles from '../style.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

const Index = ({ item2 }) => {
  return (
    <li>
      <div className={styles.two_depth_comment}>
        <div className={styles.two_depth_comment_wrap}>
          <div className={styles.user_img}></div>
          <div className={styles.comment}>
            <h4>{item2.member.nickname}</h4>
            <p>{item2.content}</p>
            <div className={styles.comment_info}>
              <ul>
                <li>
                  <em>2023년 1월 9일</em>
                </li>
                <li>
                  <FontAwesomeIcon icon={faHeart} className={styles.icon} />
                  <em>좋아요</em>
                </li>
                <li>
                  <em>신고</em>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

Index.propTypes = {
  item2: PropTypes.object,
};

export default Index;
