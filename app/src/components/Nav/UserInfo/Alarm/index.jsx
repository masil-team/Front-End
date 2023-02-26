import React, { useState } from 'react';
import styles from './style.module.css';
import { useRef } from 'react';
import usePopupClose from '../../../../hooks/usePopupClose';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';

const Index = () => {
  /* 알림 팝업창 */
  const [alarm, setAlarm] = useState(false);
  const target = useRef(null);
  const targetValue = usePopupClose(target);
  useEffect(() => {
    setAlarm(targetValue);
  }, [targetValue]);

  return (
    <li ref={target}>
      <FontAwesomeIcon icon={faBell} className={styles.icon} />
      {alarm == true && (
        <div className={styles.alarm}>
          <ul>
            <li>
              <div className={styles.alarm_info}>
                <div className={styles.user}>
                  <div className={styles.user_img}></div>
                  <em>유저 이름</em>
                </div>
                <div className={styles.time}>
                  <em>시간</em>
                </div>
              </div>
              <div className={styles.alarm_content}>
                <p>테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트</p>
              </div>
            </li>
            <li>
              <div className={styles.alarm_info}>
                <div className={styles.user}>
                  <div className={styles.user_img}></div>
                  <em>유저 이름</em>
                </div>
                <div className={styles.time}>
                  <em>시간</em>
                </div>
              </div>
              <div className={styles.alarm_content}>
                <p>테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트 테스트</p>
              </div>
            </li>
          </ul>
        </div>
      )}
    </li>
  );
};

export default Index;
