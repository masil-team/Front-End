import React from 'react';
import { useState } from 'react';
import styles from './style.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faBell, faBars, faTimes } from '@fortawesome/free-solid-svg-icons';
import usePopupClose from '../../../hooks/usePopupClose';
import { useRef } from 'react';
import { useEffect } from 'react';

const Index = () => {
  const [login] = useState(true); //로그인 여부 확인
  const [userActive, setUserActive] = useState(false); //로그인 완료시 1024미만으로 줄어들었을 경우 햄버거 아이콘 클릭시 유저 정보 active
  const target = useRef(null); //유저정보 팝업창
  const close = usePopupClose(target); //유저정보 팝업창 외 클릭시 팝업창 닫기

  useEffect(() => {
    setUserActive(close);
  }, [close]);
  return (
    <div ref={target}>
      {login === true && (
        <div
          className={styles.mobile}
          onClick={() => {
            setUserActive(!userActive);
          }}
        >
          {userActive === false && <FontAwesomeIcon icon={faBars} />}
          {userActive === true && <FontAwesomeIcon icon={faTimes} />}
        </div>
      )}
      <div
        className={`${styles.user_info} ${login === true && styles.visible} ${userActive === true && styles.active}`}
      >
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
    </div>
  );
};

export default Index;