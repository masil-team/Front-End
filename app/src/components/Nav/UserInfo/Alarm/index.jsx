import React, { useState } from 'react';
import styles from './style.module.css';
import PropTypes from 'prop-types';
import { useRef } from 'react';
import usePopupClose from '../../../../hooks/usePopupClose';
import { useEffect } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBell } from '@fortawesome/free-solid-svg-icons';
import axios from '../../../../utils/token';
import { BASE_URL } from '../../../../constants/api';
import Time from './Time';
import { useNavigate } from 'react-router-dom';

const Index = ({ alert }) => {
  const navigate = useNavigate();

  //알림 팝업창
  const [alarm, setAlarm] = useState(false);
  const target = useRef(null);
  const targetValue = usePopupClose(target);
  useEffect(() => {
    setAlarm(targetValue);
  }, [targetValue]);

  //알림 데이터
  const [data, setData] = useState([]);
  const handleAlarm = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/notifications`);
      setData(res.data.notifications);
    } catch (error) {
      console.log(error);
    }
  };

  // 알림 읽음
  const readAlarm = async id => {
    try {
      await axios.patch(`${BASE_URL}/notifications/${id}`);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleAlarm();
  }, []);

  return (
    <li ref={target}>
      <div className={`${styles.icon_box} ${alert == 'true' && styles.active}`}>
        <FontAwesomeIcon icon={faBell} className={styles.icon} />
      </div>
      {alarm == true && (
        <div className={styles.alarm}>
          {data.length == 0 && <em>알림이 없습니다</em>}
          {data && (
            <ul>
              {data.map(item => {
                return (
                  <li key={item.id}>
                    <div className={styles.alarm_info}>
                      <div className={styles.user}>
                        <div className={styles.user_img}></div>
                        <em>유저 이름</em>
                      </div>
                      <Time item={item}></Time>
                    </div>
                    <div
                      className={`${styles.alarm_content} ${item.isRead == true && styles.active}`}
                      onClick={() => {
                        readAlarm(item.id);
                        navigate(item.url);
                      }}
                    >
                      <p>{item.content}</p>
                    </div>
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      )}
    </li>
  );
};

Index.propTypes = {
  alert: PropTypes.string,
};

export default Index;
