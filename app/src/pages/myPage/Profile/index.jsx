import React from 'react';
import styles from './style.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';

const Profile = () => {
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
          <input style={{ marginBottom: '35px' }} placeholder="이메일" className={styles.input}></input>
          <span>주소 정보</span>
          <input style={{ marginBottom: '10px' }} placeholder="주소 정보" className={styles.input} />
          <button className={styles.imageBtn}>주소 등록</button>
        </div>
      </div>
      <div className={styles.second}>
        <div className={styles.password}>
          <span>비밀번호 변경</span>
          <input style={{ marginBottom: '10px' }} placeholder="현재 비밀번호" className={styles.input} />
          <input style={{ marginBottom: '10px' }} placeholder="새 비밀번호" className={styles.input} />
          <input style={{ marginBottom: '10px' }} placeholder="새 비밀번호 확인" className={styles.input} />
          <button className={styles.imageBtn}>비밀번호 변경</button>
        </div>
        <div className={styles.nickname}>
          <span>닉네임 변경</span>
          <input style={{ marginBottom: '10px' }} placeholder="닉네임" className={styles.input} />
          <button className={styles.imageBtn}>닉네임 변경</button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
