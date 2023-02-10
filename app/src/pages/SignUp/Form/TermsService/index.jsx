import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import styles from './style.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; //폰트어썸
import { faAngleRight } from '@fortawesome/free-solid-svg-icons'; //폰트어썸

const Index = ({ serviceCheck, setServiceCheck, infoCheck, setInfoCheck }) => {
  const [allCheck, setAllCheck] = useState(false); //모든 체크박스 체크
  const [eventCheck, setEventCheck] = useState(false); //이벤트 체크 박스

  //이용약관 모두 체크
  const allBtnEvent = () => {
    if (allCheck === false) {
      setAllCheck(true);
      setServiceCheck(true);
      setEventCheck(true);
      setInfoCheck(true);
    } else {
      setAllCheck(false);
      setServiceCheck(false);
      setEventCheck(false);
      setInfoCheck(false);
    }
  };

  //이용약관 약관 동의
  const serviceBtnEvent = () => {
    if (serviceCheck === false) {
      setServiceCheck(true);
    } else {
      setServiceCheck(false);
    }
  };

  //이벤트 약관 동의
  const eventBtnEvent = () => {
    if (eventCheck === false) {
      setEventCheck(true);
    } else {
      setEventCheck(false);
    }
  };

  //개인 정보 수집 약관 동의
  const infoBtnEvent = () => {
    if (infoCheck === false) {
      setInfoCheck(true);
    } else {
      setInfoCheck(false);
    }
  };
  //input true,false 확인후 all input 체크 변경
  useEffect(() => {
    if (serviceCheck === true && eventCheck === true && infoCheck === true) {
      setAllCheck(true);
    } else {
      setAllCheck(false);
    }
  }, [serviceCheck, eventCheck, infoCheck]);

  return (
    <div className={styles.terms_service}>
      <div className={styles.all_check_box}>
        <input
          type="checkbox"
          id="all_check"
          checked={allCheck}
          onChange={() => {
            allBtnEvent();
          }}
        />
        <label htmlFor="all_check">선택 포함 전체 약관 동의</label>
      </div>
      <span className={styles.line}></span>
      <div className={styles.check_box}>
        <input
          type="checkbox"
          id="check1"
          checked={serviceCheck}
          onChange={() => {
            serviceBtnEvent();
          }}
        />
        <label htmlFor="check1">이용약관 동의(필수)</label>
        <p>
          약관 보기 <FontAwesomeIcon icon={faAngleRight} />
        </p>
      </div>
      <div className={styles.check_box}>
        <input
          type="checkbox"
          id="check2"
          checked={eventCheck}
          onChange={() => {
            eventBtnEvent();
          }}
        />
        <label htmlFor="check2">이벤트, 혜택 알림 수신 동의(선택)</label>
        <p>
          약관 보기 <FontAwesomeIcon icon={faAngleRight} />
        </p>
      </div>
      <div className={styles.check_box}>
        <input
          type="checkbox"
          id="check3"
          checked={infoCheck}
          onChange={() => {
            infoBtnEvent();
          }}
        />
        <label htmlFor="check3">개인 정보 수집 및 이용 동의(필수)</label>
        <p>
          약관 보기 <FontAwesomeIcon icon={faAngleRight} />
        </p>
      </div>
    </div>
  );
};

Index.propTypes = {
  serviceCheck: PropTypes.bool,
  setServiceCheck: PropTypes.func,
  infoCheck: PropTypes.bool,
  setInfoCheck: PropTypes.func,
};

export default Index;
