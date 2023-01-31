import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
// import { BASE_URL, USER_URL } from '../../../constants/api';
import { useEffect } from 'react';
import styles from './style.module.css';
import axios from '../../../utils/token';
import { setCookie } from '../../../utils/cookie';
import { useNavigate } from 'react-router-dom';
const Form = () => {
  const nav = useNavigate();
  const { register, handleSubmit, getValues, formState } = useForm();
  // 회원가입시 전송될 데이터
  const sendLoginData = async () => {
    // input 에 들어있는 email value
    const email = getValues('email');
    // input 에 들어있는 password value
    const password = getValues('password');
    //login api data
    const loginRequest = {
      email,
      password,
    };
    try {
      const response = await axios.post(`http://13.209.94.72:8080/auth/login`, loginRequest);
      if (response) {
        //sessionStorage 에 refresh token 저장
        sessionStorage.setItem('refreshToken', response.data.refreshToken);
        //cookie 에 access token 저장
        setCookie('accessToken', response.data.accessToken);
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
        {/* email 유효성검사 메시지 */}
        {/* password 유효성검사 메시지 */}
        <input
          className={styles.input}
          {...register('email', {
            required: '이메일은 필수 입력입니다.',
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
