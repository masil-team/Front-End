import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { BASE_URL, USER_URL } from '../../../constants/api';
import axios from 'axios';
import { useEffect } from 'react';
import styles from './style.module.css';

const Form = () => {
  const { register, handleSubmit, getValues, formState } = useForm();
  // input 에 들어있는 email value
  const email = getValues('email');
  // input 에 들어있는 password value
  const password = getValues('password');
  // 회원가입시 전송될 데이터
  const sendLoginData = async () => {
    //login api data
    const user = {
      email,
      password,
    };
    try {
      const response = await axios.post(`${BASE_URL} ${USER_URL.LOGIN}`, { user });
      console.log(response);
    } catch (err) {
      console.log(err);
    }
  };
  // form 안에 input, error 등이 변할경우 useEffect 실행.
  useEffect(() => {}, [formState]);
  return (
    <>
      <form className={styles.form} onSubmit={handleSubmit(sendLoginData)}>
        <span className={styles.span}>
          이메일<span className={styles.spanICon}>*</span>
          <span className={styles.error}>{formState.errors.email?.message}</span>
        </span>
        {/* email 유효성검사 메시지 */}

        {/* password 유효성검사 메시지 */}

        <input
          className={styles.input}
          {...register('email', {
            required: '이메일은 필수 입력입니다.',
            // email 최소길이
            minLength: {
              value: 5,
              message: '5글자이상 입력해주세요.',
            },
            // email 정규식
            pattern: {
              value: /^[a-zA-Z0-9]+@[a-z0-9]+\.[a-z]{2,3}/,
              message: '이메일 형식은 @와 .이들어가야합니다.',
            },
            // email 최대길이
            maxLength: {
              value: 22,
              message: '22글자 이하로 입력해주세요.',
            },
          })}
          type="text"
          placeholder="이메일을 입력해주세요"
        ></input>
        <span className={styles.span2}>
          비밀번호<span className={styles.spanICon}>*</span>
          <span className={styles.error}>{formState.errors.password?.message}</span>
        </span>
        <input
          className={styles.input}
          {...register('password', {
            required: '비밀번호는 필수입니다.',
            minLength: {
              // password 최소길이
              value: 8,
              message: '비밀번호는 8글자이상입력부탁드립니다',
            },
            // password 최대길이
            maxLength: {
              value: 14,
              message: '비밀번호는 14글자 이하로부탁드립니다',
            },
            // password 정규식
            pattern: {
              value: /[`~!@#$%^&*|₩₩₩'₩";:₩/?]/gi,
              message: '비밀번호는 특수문자 ~!@#$%^&* 포함해주셔야합니다.',
            },
          })}
          type="password"
          placeholder="비밀번호를 입력해주세요"
        ></input>
        <div className={styles.passwordBox}>
          <Link to="#">
            <span>비밀번호 찾기</span>
          </Link>
        </div>
        <button className={styles.btn}>로그인</button>
        <button className={styles.btn}>회원가입</button>
      </form>
    </>
  );
};

export default Form;
