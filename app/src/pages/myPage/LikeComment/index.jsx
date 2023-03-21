import React, { useState } from 'react';
import styles from './style.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMessage } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import { useEffect } from 'react';
import { BASE_URL } from '../../../constants/api';
import axios from '../../../utils/token';
import useTime from '../../../hooks/useTime';

const CommentLike = () => {
  const [item, setItem] = useState([]);
  const [newItem, setNewItem] = useState([]);
  const offset = 5;
  const [page, setPage] = useState(0);
  const [day, setDay] = useState([]);
  const time = useTime(day);
  let totalPages = Math.round(item.length / offset);
  const pages = Array.from({ length: totalPages }, (v, i) => i + 1);
  const nav = useNavigate();
  const user = JSON.parse(sessionStorage.getItem('user'));
  const memberId = user.id;
  const getList = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/members/${memberId}/my/comment-likes`);
      setItem(res.data.comments);
      setDay(res.data.comments);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getList();
  }, []);
  /* time이 변경될때 마다 실행  */
  useEffect(() => {
    const dataCopy = [...day];
    const filteredArr = dataCopy.reduce((acc, current) => {
      const x = acc.find(item => item.id === current.id);
      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, []);
    const newArray = filteredArr.filter((item, index) => {
      const newItem = (item.newTime = time[index]);
      return newItem;
    });
    setNewItem(newArray);
  }, [time]);
  return (
    <div className={styles.container}>
      <div className={styles.NameBox}>
        <h1 className={styles.h1}>좋아요한 댓글</h1>
      </div>
      <ul className={styles.ulbox}>
        {newItem.slice(offset * page, offset * page + offset).map(i => (
          <li onClick={() => nav('#')} className={styles.list} key={i.id}>
            <div>
              <div className={styles.tag}>
                <div className={styles.photo}></div>
                <div className={styles.content}>
                  <span>{i.member.nickname}</span>
                  <span style={{ fontSize: '0.7rem' }}>{i.newTime}</span>
                </div>
              </div>
              <div className={styles.maincontent}>
                <span>{i.content}</span>
              </div>
              <div className={styles.icon}>
                <FontAwesomeIcon className={styles.images} icon={faMessage} />
              </div>
            </div>
          </li>
        ))}
      </ul>
      <div className={styles.pagebox}>
        {pages.map(i => (
          <li onClick={() => setPage(i - 1)} key={i + 100}>
            {i}
          </li>
        ))}
      </div>
    </div>
  );
};

export default CommentLike;
