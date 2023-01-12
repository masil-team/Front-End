import React from 'react';
import { Link } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { BASE_URL, USER_URL } from '../../../constants/api';
import axios from 'axios';
import { useEffect } from 'react';
const Form = () => {
  const {
    register,
    handleSubmit,
    getValues,
    formState: { errors },
  } = useForm();
  const email = getValues('email');
  const password = getValues('password');
  const sendLoginData = async () => {
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

  useEffect(() => {
    if (errors) {
      console.log(errors);
    }
  }, [email, password]);
  return (
    <div>
      <form onSubmit={handleSubmit(sendLoginData)}>
        <span>이메일</span>
        <input
          {...register('email', {
            required: '이메일은 필수 입력입니다.',
            minLength: {
              value: 5,
              message: '5글자이상 입력해주세요.',
            },
            maxLength: {
              value: 12,
              message: '12글자 이하로 입력해주세요.',
            },
          })}
          type="text"
          placeholder="이메일을 입력해주세요"
        ></input>
        <span>비밀번호</span>
        <input {...register('password')} type="password" placeholder="비밀번호를 입력해주세요"></input>
        <Link to="#">비밀번호 찾기</Link>
        <button>로그인</button>
        <button>회원가입</button>
      </form>
    </div>
  );
};

export default Form;
