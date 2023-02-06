import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera } from '@fortawesome/free-solid-svg-icons';
import styles from './style.module.css';
import { useForm } from 'react-hook-form';
import PropTypes from 'prop-types';
import axios from '../../../utils/token';
import { useNavigate } from 'react-router-dom';

const Form = ({ image, setImage, count, setCount }) => {
  const { register, getValues } = useForm();
  const nav = useNavigate();
  const getImages = () => {
    if (count === 10) {
      alert('사진은 최대 10장입니다.');
    } else {
      setCount(prev => prev + 1);
      setImage(prev => {
        return [...prev, count];
      });
    }
  };

  const uploadData = async () => {
    const category = getValues('category');
    const text = getValues('text');
    try {
      const response = await axios.post('http://13.209.94.72:8080/posts', { content: text, boardId: category });
      if (response.status === 201) {
        alert('게시물 업로드 완료');
        sessionStorage.removeItem('postList');
        sessionStorage.removeItem('pageNum');
        sessionStorage.removeItem('category');
        nav('/');
      }
    } catch (err) {
      console.log(err);
    }
    console.log(category, text, image);
  };

  return (
    <>
      <div className={styles.firstsection}>
        <div className={styles.categoryBox}>
          <select {...register('category')} className={styles.select}>
            <option value="1">카테고리</option>
            <option value="2">동네</option>
            <option value="3">주변</option>
          </select>
          <button onClick={uploadData} className={styles.btn}>
            올리기
          </button>
        </div>
        <div onClick={getImages} className={styles.photoupload}>
          <FontAwesomeIcon style={{ fontSize: '32px' }} icon={faCamera} />
          <span style={{ fontSize: '16px' }}>사진올리기</span>
          <span style={{ fontSize: '12px' }}>(최대 10장)</span>
        </div>
      </div>
      <div className={styles.secondsection}>
        <textarea {...register('text')} type="text" placeholder="당신의 이야기를 적어주세요"></textarea>
      </div>
    </>
  );
};
Form.propTypes = {
  image: PropTypes.array,
  setImage: PropTypes.func,
  count: PropTypes.number,
  setCount: PropTypes.func,
};
export default Form;
