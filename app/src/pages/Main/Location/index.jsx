import React from 'react';
import styles from './style.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStreetView, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import Address from './Address';
import { useRef } from 'react';
import usePopupClose from '../../../hooks/usePopupClose';
import { useEffect } from 'react';

const Index = () => {
<<<<<<< HEAD
  const [location] = useState(false); //위치 설정 true,false 체크
=======
  const [location] = useState(true); //위치 설정 true,false 체크
>>>>>>> 478e21e1a72341f1477fd1c9bcbf0e7b24cd9a79
  const [popUp, setPopUp] = useState(false); //팝업 true,false
  const target = useRef(); //팝업 타겟
  const close = usePopupClose(target); //팝업 커스텀 훅

  useEffect(() => {
    setPopUp(close);
  }, [close]);
  return (
<<<<<<< HEAD
    <div ref={target}>
=======
    <div ref={target} className={styles.wrap}>
>>>>>>> 478e21e1a72341f1477fd1c9bcbf0e7b24cd9a79
      {location === true ? (
        <div
          className={styles.location}
          onClick={() => {
            setPopUp(true);
          }}
        >
          <ul>
            <li>
              <FontAwesomeIcon icon={faStreetView} className={styles.icon} />
            </li>
            <li>
              <em>북구 이웃</em>
            </li>
            <li>
              <FontAwesomeIcon icon={faSortDown} className={styles.icon} />
            </li>
          </ul>
        </div>
      ) : (
        <div
          className={styles.add_location}
          onClick={() => {
            setPopUp(true);
          }}
        >
          <ul>
            <li>
              <FontAwesomeIcon icon={faStreetView} className={styles.icon} />
            </li>
            <li>
              <em>주소 등록</em>
            </li>
          </ul>
        </div>
      )}
      {popUp === true && <Address setPopUp={setPopUp}></Address>}
    </div>
  );
};

export default Index;
