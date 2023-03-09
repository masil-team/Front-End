import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faCamera, faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';
import styles from './style.module.css';
import PropTypes from 'prop-types';
import axios from '../../../utils/token';
import { useNavigate } from 'react-router-dom';
import { AnimatePresence, motion } from 'framer-motion';
import { useState } from 'react';
import { BASE_URL } from '../../../constants/api';
const subMenuAnimate = {
  initial: {
    opacity: 0,
    rotateX: -15,
    transition: {
      duration: 0.2,
      delay: 0.1,
    },
    transitionEnd: {
      display: 'none',
    },
  },
  animate: {
    opacity: 1,
    rotateX: 0,
    transition: {
      duration: 0.2,
    },
    display: 'block',
  },
  exit: {
    opacity: 0,
    rotateX: -15,
    transition: {
      duration: 0.2,
      delay: 0.1,
    },
    transitionEnd: {
      display: 'none',
    },
  },
};
const categories = [
  { text: '카테고리', val: 1 },
  { text: '동네소식', val: 2 },
  { text: '동네질문', val: 3 },
  { text: '일상', val: 4 },
  { text: '분실/실종', val: 5 },
];
// , ,
const Form = ({ image, setImage, count, setCount }) => {
  const [show, setShow] = useState(false);
  const nav = useNavigate();
  const modify = JSON.parse(sessionStorage.getItem('postModify'));
  const [text, setText] = useState(modify ? modify.content : '');
  const [category, setCategory] = useState({
    text: modify ? categories[modify.boardId - 1].text : '카테고리',
    val: modify ? categories[modify.boardId - 1].val : 0,
  });

  const editData = async () => {
    try {
      const response = await axios.patch(`${BASE_URL}/posts/${modify.id}`, {
        content: text,
        boardId: category.val,
      });
      if (response.status === 200) {
        alert('게시물 수정 완료');
        sessionStorage.removeItem('postList');
        sessionStorage.removeItem('pageNum');
        nav('/');
      }
    } catch (err) {
      console.log(err);
    }
  };

  const uploadData = async () => {
    if (image.length === 0) return alert('이미지는 필수 입니다.');
    if (text.length === 0) return alert('내용은 필수 입니다.');
    const boardId = category.val;
    const ids = image.map(i => i.id);
    const fileIds = [...ids];
    if (boardId === 0) {
      alert('카테고리를 선택해주세요.');
    } else {
      try {
        const response = await axios.post(`${BASE_URL}/posts`, { boardId, content: text, fileIds });
        if (response.status === 201) {
          alert('게시물 업로드 완료');
          sessionStorage.removeItem('postList');
          sessionStorage.removeItem('pageNum');
          nav('/');
        }
      } catch (err) {
        console.log(err);
      }
    }
  };
  const onChangeImg = async e => {
    if (count === 10) return alert('사진은 최대 10장 입니다.');
    const uploadFile = e.target.files[0];
    const formData = new FormData();
    formData.append('file', uploadFile);
    try {
      const res = await axios.post(`${BASE_URL}/s3/post-image`, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setImage(prev => [...prev, res.data]);
      setCount(prev => prev + 1);
    } catch (err) {
      console.log(err);
      alert('image 업로드에 실패했습니다.');
    }
  };
  return (
    <>
      <div className={styles.firstsection}>
        <div className={styles.categoryBox}>
          <ul onClick={() => setShow(prev => !prev)} className={styles.ul}>
            <span>{category.text}</span>
            <span>
              {show ? (
                <FontAwesomeIcon className={styles.icon1} icon={faSortUp} />
              ) : (
                <FontAwesomeIcon className={styles.icon2} icon={faSortDown} />
              )}
            </span>
            <AnimatePresence>
              {show && (
                <motion.div
                  variants={subMenuAnimate}
                  transition={{ duration: 0.3 }}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  {categories.slice(1, 5).map(i => (
                    <div key={i.val}>
                      <li key={i.val} className={styles.li}>
                        <button key={i.text} onClick={() => setCategory(i)}>
                          {i.text}
                        </button>
                      </li>
                    </div>
                  ))}
                </motion.div>
              )}
            </AnimatePresence>
          </ul>

          <button onClick={modify ? editData : uploadData} className={styles.btn}>
            올리기
          </button>
        </div>

        <input
          type="file"
          id="profile_upload"
          accept="image/*"
          onChange={e => {
            onChangeImg(e);
          }}
          style={{ display: 'none' }}
        />
        <label htmlFor="profile_upload" className={styles.photoupload}>
          <FontAwesomeIcon style={{ fontSize: '32px' }} icon={faCamera} />
          <span style={{ fontSize: '16px' }}>사진올리기</span>
          <span style={{ fontSize: '12px' }}>(최대 10장)</span>
        </label>
      </div>
      <div className={styles.secondsection}>
        <textarea
          onChange={e => setText(e.currentTarget.value)}
          value={text}
          type="text"
          placeholder="당신의 이야기를 적어주세요"
        ></textarea>
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
