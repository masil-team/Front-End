import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStreetView, faSortDown } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import Address from './Address';
import { useRef } from 'react';
import usePopupClose from '../../../hooks/usePopupClose';
import { useEffect } from 'react';

const Index = ({ setAddress }) => {
  const [location, setLocation] = useState(false); //위치 설정 true,false 체크
  const [popUp, setPopUp] = useState(false); //팝업 true,false
  const target = useRef(); //팝업 타겟
  const close = usePopupClose(target); //팝업 커스텀 훅

  let getAddressInfo = sessionStorage.getItem('addressInfo');
  getAddressInfo = JSON.parse(getAddressInfo);

  useEffect(() => {
    if (getAddressInfo != null) {
      setLocation(true);
    }
  }, [getAddressInfo]);

  useEffect(() => {
    setPopUp(close);
  }, [close]);
  return (
    <div ref={target} className={styles.wrap}>
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
              <em>
                {(getAddressInfo && getAddressInfo.emdName) || getAddressInfo.sggName || getAddressInfo.sidoName} 이웃
              </em>
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
      {popUp === true && <Address setAddress={setAddress} setPopUp={setPopUp} setLocation={setLocation}></Address>}
    </div>
  );
};

Index.propTypes = {
  setAddress: PropTypes.func,
};

export default Index;
