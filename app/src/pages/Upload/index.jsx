import Nav from '../../components/Nav';
import React from 'react';
import styles from './style.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import { useForm } from 'react-hook-form';

// const hidden = {
//   initial: {},
//   animate: {},
//   exit: {},
// };

const CreatePost = () => {
  const { register } = useForm();
  const arr = Array.from({ length: 10 }, (key, index) => index + 1);
  return (
    <>
      <Nav />
      <div className={styles.container}>
        <div className={styles.innerContainer}>
          <div className={styles.firstsection}>
            <div className={styles.categoryBox}>
              <select className={styles.select}>
                <option>카테고리</option>
              </select>
              <button className={styles.btn}>올리기</button>
            </div>
            <div className={styles.photoupload}>
              <FontAwesomeIcon style={{ fontSize: '32px' }} icon={faCamera} />
              <span style={{ fontSize: '16px' }}>사진올리기</span>
              <span style={{ fontSize: '12px' }}>(최대 10장)</span>
            </div>
          </div>
          <div className={styles.secondsection}>
            <textarea {...register('text')} type="text" placeholder="당신의 이야기를 적어주세요"></textarea>
          </div>
          <div className={styles.thirdsection}>
            <div className={styles.gridBox}>
              {arr.map(i => {
                return (
                  <div className={styles.gridItem} key={i}>
                    {i}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePost;
