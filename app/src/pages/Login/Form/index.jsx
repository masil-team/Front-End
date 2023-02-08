import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { useEffect } from 'react';
import styles from './style.module.css';
import { setCookie } from '../../../utils/cookie';
import { useNavigate } from 'react-router-dom';

const Form = () => {
  const { register, handleSubmit, getValues, formState } = useForm();
  const nav = useNavigate();
  // input 에 들어있는 email value

  // 회원가입시 전송될 데이터
  const sendLoginData = async () => {
    //login api data
    const email = getValues('email');
    const password = getValues('password');

    const loginRequest = {
      email,
      password,
    };
    try {
      const response = await axios.post(`http://13.209.94.72:8080/auth/login`, loginRequest);
      console.log(response);
      if (response) {
        sessionStorage.setItem('accessToken', response.data.accessToken);
        setCookie('refreshToken', response.data.refreshToken);
        nav('/');
      }
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
        <input
          className={styles.input}
          {...register('email', {
            required: '이메일은 필수 입력입니다.',
            // email 최대길이
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
