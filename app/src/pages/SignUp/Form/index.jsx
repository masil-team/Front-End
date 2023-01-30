import React, { useEffect } from 'react';
import axios from 'axios';
import styles from './style.module.css';
import { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'; //폰트어썸
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'; //폰트어썸
import { useNavigate } from 'react-router-dom';
import TermsService from './TermsService';
import { PATH } from '../../../constants/path';

const Index = () => {
  const navigate = useNavigate();
  const [serviceCheck, setServiceCheck] = useState(false);
  const [infoCheck, setInfoCheck] = useState(false);
  const [inputValue, setInputValue] = useState({
    userPassword: '',
    userPasswordCheck: '',
    userEmail: '',
    userName: '',
  });
  const [userEmailCheck, setUserEmailCheck] = useState(false); //이메일 확인 체크
  const [EmailLengthCheck, setEmailLengthCheck] = useState(false); //이메일 글자수 체크
  const [userPasswordCheck, setUserPasswordCheck] = useState(false); //비밀번호 체크
  const [PasswordCheck, setPasswordCheck] = useState(false); //비밀번호 확인 체크
  const [userNameCheck, setUserNameCheck] = useState(false); //이름 체크
  const [allCheck, setAllCheck] = useState(false); //모든 유효성검사 완료 체크

  //회원가입 API 데이터
  const joinData = {
    email: inputValue.userEmail,
    password: inputValue.userPassword,
    passwordConfirmation: inputValue.userPasswordCheck,
    nickname: inputValue.userName,
  };
  console.log(joinData);

  //회원가입 버튼 클릭시 전송
  const sendJoinForm = async () => {
    try {
      const res = await axios.post(`http://13.209.94.72:8080/auth/signup `, joinData);
      console.log(res);
      navigate(`${PATH.LOGIN}`);
    } catch (error) {
      console.log(error);
    }
  };

  //비밀번호 특수문자 검사 정규표현식
  const specialLetter = inputValue.userPassword.search(/[`~!@#$%^&*|₩₩₩'₩";:₩/?]/gi);

  //특수문자 1자 이상 전체 8장 이상시 true 반환
  const validPassword = specialLetter >= 0 && inputValue.userPassword.length >= 8;

  //이메일 @와 .이 들어가는지 체크
  const validEmail = inputValue.userEmail.includes('@') && inputValue.userEmail.includes('.');

  //input에 입력받은 값을 inputValue에게 저장
  const handleInput = event => {
    const { name, value } = event.target;
    setInputValue({
      ...inputValue,
      [name]: value,
    });
  };

  //input 유효성 검사
  const inputCheck = () => {
    //이메일 체크
    if (validEmail == true) {
      setUserEmailCheck(true);
    } else {
      setUserEmailCheck(false);
    }

    //이메일 글자수 체크
    if (inputValue.userEmail.length >= 5) {
      setEmailLengthCheck(true);
    } else {
      setEmailLengthCheck(false);
    }

    //비밀번호 유효성 검사 체크
    if (validPassword == true) {
      setUserPasswordCheck(true);
    } else {
      setUserPasswordCheck(false);
    }

    //비밀번호 확인 체크
    if (inputValue.userPassword == inputValue.userPasswordCheck) {
      setPasswordCheck(true);
    } else {
      setPasswordCheck(false);
    }

    //이름 2글자 이상 체크
    if (inputValue.userName.length >= 2) {
      setUserNameCheck(true);
    } else {
      setUserNameCheck(false);
    }
  };

  //input true,false 체크 함수 실행
  useEffect(() => {
    inputCheck();
  }, [inputValue]);

  //각 항목 조건 완료여부 확인
  const handleAllCheck = () => {
    if (
      PasswordCheck == true &&
      userEmailCheck == true &&
      userNameCheck == true &&
      serviceCheck == true &&
      infoCheck == true
    ) {
      setAllCheck(true);
    } else {
      setAllCheck(false);
    }
  };

  //아래 의존성 값들이 변경될때마다 체크완료 함수 작동
  useEffect(() => {
    handleAllCheck();
  }, [PasswordCheck, userEmailCheck, userNameCheck, serviceCheck, infoCheck]);

  return (
    <form className={styles.join_form}>
      <div className={`${styles.email} ${styles.join_input_box}`}>
        <input
          type="text"
          placeholder="이메일"
          name="userEmail"
          onChange={e => {
            handleInput(e);
          }}
        />
        {userEmailCheck == false ? (
          <div className={styles.warning}>
            <FontAwesomeIcon icon={faExclamationCircle} />
            <p>이메일을 입력해주세요</p>
          </div>
        ) : null}
        {EmailLengthCheck == false ? (
          <div className={styles.warning}>
            <FontAwesomeIcon icon={faExclamationCircle} />
            <p>5글자 이상 입력해주세요</p>
          </div>
        ) : null}
      </div>
      <div className={`${styles.password} ${styles.join_input_box}`}>
        <input
          type="password"
          placeholder="비밀번호"
          name="userPassword"
          onChange={e => {
            handleInput(e);
          }}
        />
        <input
          type="password"
          placeholder="비밀번호 확인"
          name="userPasswordCheck"
          onChange={e => {
            handleInput(e);
          }}
        />
        {userPasswordCheck == false ? (
          <div className={styles.warning}>
            <FontAwesomeIcon icon={faExclamationCircle} />
            <p>8자 이상,특수문자 + 영문,숫자를 입력해주세요</p>
          </div>
        ) : null}
        {PasswordCheck == false ? (
          <div className={styles.warning}>
            <FontAwesomeIcon icon={faExclamationCircle} />
            <p>비밀번호를 확인해주세요</p>
          </div>
        ) : null}
      </div>
      <div className={`${styles.name} ${styles.join_input_box}`}>
        <input
          type="text"
          placeholder="닉네임"
          name="userName"
          onChange={e => {
            handleInput(e);
          }}
        />
        {userNameCheck == false ? (
          <div className={styles.warning}>
            <FontAwesomeIcon icon={faExclamationCircle} />
            <p>닉네임을 입력해주세요</p>
          </div>
        ) : null}
      </div>
      <TermsService
        serviceCheck={serviceCheck}
        setServiceCheck={setServiceCheck}
        infoCheck={infoCheck}
        setInfoCheck={setInfoCheck}
      ></TermsService>
      {allCheck == true ? (
        <button
          className={styles.join_btt1}
          onClick={e => {
            e.preventDefault();
            sendJoinForm();
          }}
        >
          회원 가입 완료
        </button>
      ) : (
        <button
          className={styles.join_btt2}
          onClick={e => {
            e.preventDefault();
          }}
        >
          회원 가입 완료
        </button>
      )}
    </form>
  );
};

export default Index;
