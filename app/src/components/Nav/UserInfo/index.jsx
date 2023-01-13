import React from 'react';
import { useState } from 'react';
import styles from './style.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faBell } from '@fortawesome/free-solid-svg-icons';

const Index = () => {
  const [login] = useState(false);
  return (
    <div className={styles.user_info}>
      {login === false ? (
        <div className={styles.non_login}>
          <ul>
            <li>
              <em>로그인</em>
            </li>
            <li>
              <em>로그아웃</em>
            </li>
          </ul>
        </div>
      ) : (
        <div className={styles.on_login}>
          <ul>
            <li>
              <div className={styles.icon_box}>
                <ul>
                  <li>
                    <FontAwesomeIcon icon={faHeart} className={styles.icon} />
                  </li>
                  <li>
                    <FontAwesomeIcon icon={faBell} className={styles.icon} />
                  </li>
                </ul>
              </div>
            </li>
            <li>
              <em>마이페이지</em>
            </li>
            <li>
              <div className={styles.user}>
                <div className={styles.userImg}></div>
                <em>사용자 이름</em>
              </div>
            </li>
            <li>
              <em>로그아웃</em>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

export default Index;
