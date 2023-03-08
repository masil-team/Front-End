import React, { useState } from 'react';
import styles from './style.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import Search from './EditAdress/Search/index';
import { useForm } from 'react-hook-form';
const Profile = () => {
  const userInfo = JSON.parse(sessionStorage.getItem('user'));
  const [popUp, setPopUp] = useState(false);
  const { register, getValues } = useForm();

  const nicknameChange = () => {
    const new_nickname = getValues('new_nickname');
    console.log(new_nickname);
  };

  const changePassword = () => {
    const current_password = getValues('current_password');
    const new_password = getValues('new_password');
    const new_password_confirmation = getValues('new_password_confirmation');
    console.log(current_password, new_password, new_password_confirmation);
  };
  return (
    <div className={styles.container}>
      <h1 className={styles.h1}>회원정보 변경</h1>
      <div className={styles.first}>
        <div className={styles.imageControl}>
          <div className={styles.image}>
            <div>
              <FontAwesomeIcon icon={faCamera} />
            </div>
          </div>
          <button className={styles.imageBtn}>프로필변경</button>
        </div>
        <div className={styles.emailLocation}>
          <span>이메일 정보</span>
          <input style={{ marginBottom: '35px' }} placeholder={userInfo.email} className={styles.input}></input>
          <span>주소 정보</span>
          <input style={{ marginBottom: '10px' }} placeholder={userInfo.address.emdName} className={styles.input} />
          <button onClick={() => setPopUp(true)} className={styles.imageBtn}>
            주소 등록
          </button>
          {popUp && <Search setPopUp={setPopUp}></Search>}
        </div>
      </div>
      <div className={styles.second}>
        <div className={styles.password}>
          <span>비밀번호 변경</span>
          <input
            {...register('current_password')}
            style={{ marginBottom: '10px' }}
            placeholder="현재 비밀번호"
            className={styles.input}
          />
          <input
            {...register('new_password')}
            style={{ marginBottom: '10px' }}
            placeholder="새 비밀번호"
            className={styles.input}
          />
          <input
            {...register('new_password_confirmation')}
            style={{ marginBottom: '10px' }}
            placeholder="새 비밀번호 확인"
            className={styles.input}
          />
          <button onClick={changePassword} className={styles.imageBtn}>
            비밀번호 변경
          </button>
        </div>
        <div className={styles.nickname}>
          <span>닉네임 변경</span>
          <input
            {...register('new_nickname')}
            style={{ marginBottom: '10px' }}
            placeholder={userInfo.nickname}
            className={styles.input}
          />
          <button onClick={nicknameChange} className={styles.imageBtn}>
            닉네임 변경
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
