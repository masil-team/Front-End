import React from 'react';
import { useState } from 'react';
import styles from './style.module.css';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faTimes, faBookmark } from '@fortawesome/free-solid-svg-icons';
import usePopupClose from '../../../hooks/usePopupClose';
import { useRef } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../../constants/path';
import axios from '../../../utils/token';
import { BASE_URL } from '../../../constants/api';
import Alarm from './Alarm';

const Index = ({ alert }) => {
  const navigate = useNavigate();
  const [login, setLogin] = useState(false); //로그인 여부 확인
  const [userActive, setUserActive] = useState(false); //로그인 완료시 1024미만으로 줄어들었을 경우 햄버거 아이콘 클릭시 유저 정보 active
  const target = useRef(null); //유저정보 팝업창
  const close = usePopupClose(target); //유저정보 팝업창 외 클릭시 팝업창 닫기
  const [user, setUser] = useState(); //유저 정보

  const handleUserIfo = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/members/login-user`);
      setLogin(true);
      sessionStorage.setItem('user', JSON.stringify(res.data));
      sessionStorage.setItem('addressInfo', JSON.stringify(res.data.address));
      setUser(res.data);
    } catch (error) {
      if (error) {
        sessionStorage.removeItem('user');
      }
    }
  };

  const logout = () => {
    setLogin(false);
    sessionStorage.clear();
    navigate('/');
    window.location.reload();
  };

  useEffect(() => {
    setUserActive(close);
  }, [close]);

  useEffect(() => {
    handleUserIfo();
  }, []);
  return (
    <div ref={target}>
      {login === true && (
        <div
          className={styles.mobile}
          onClick={e => {
            e.stopPropagation();
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
                <em
                  onClick={() => {
                    navigate(PATH.LOGIN);
                  }}
                >
                  로그인
                </em>
              </li>
              <li>
                <em
                  onClick={() => {
                    navigate(PATH.SIGNUP);
                  }}
                >
                  회원가입
                </em>
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
                      <FontAwesomeIcon icon={faBookmark} className={styles.icon} />
                    </li>
                    <Alarm alert={alert}></Alarm>
                  </ul>
                </div>
              </li>
              <li onClick={() => navigate('/mypage/bookmark')}>
                <em>마이페이지</em>
              </li>
              <li>
                <div className={styles.user}>
                  <div className={styles.userImg}></div>
                  {user && <em>{user.nickname}</em>}
                </div>
              </li>
              <li>
                <em
                  onClick={() => {
                    logout();
                  }}
                >
                  로그아웃
                </em>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

Index.propTypes = {
  alert: PropTypes.bool,
};

export default Index;
