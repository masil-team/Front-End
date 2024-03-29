import React from 'react';
import styles from '../Card/style.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import axios from '../../../../utils/token';
import { BASE_URL } from '../../../../constants/api';
import { useState } from 'react';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../../../constants/path';
import userCheck from '../../../../utils/userCheck';

const Index = ({ item, setData, setNewData }) => {
  //유저 여부 확인
  const user = userCheck();
  const navigate = useNavigate();
  const [like, setLike] = useState(item.likeCount); //좋아요 저장
  const [likeColor, setLikeColor] = useState();
  let getList = sessionStorage.getItem('myPageList');
  getList = JSON.parse(getList);
  function filterArray() {
    const copy = [...getList];
    let targetItem = copy.filter(target => {
      return target.id !== item.id;
    });
    console.log(targetItem);

    setNewData(targetItem);
    setData(targetItem);
    sessionStorage.setItem('myPageList', JSON.stringify(targetItem));
  }
  const onDataLike = async () => {
    try {
      const res = await axios.put(`${BASE_URL}/posts/${item.id}/like`);
      if (res.data.isLike === true) {
        setLike(prev => prev + 1);
        filterArray(true, res.data.likeCount);
        setLikeColor(true);
      } else {
        setLike(prev => prev - 1);
        filterArray(false, res.data.likeCount);
        setLikeColor(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (item.isLiked == true) {
      setLikeColor(true);
    } else {
      setLikeColor(false);
    }
  }, []);

  return (
    <li>
      <FontAwesomeIcon
        icon={faHeart}
        className={`${styles.icon} ${likeColor === true && styles.active} ${item.isOwner == true && styles.visible}`}
        onClick={() => {
          if (user == false) {
            navigate(PATH.LOGIN);
            return;
          }
          onDataLike();
        }}
      />
      <em>{like}</em>
    </li>
  );
};

Index.propTypes = {
  item: PropTypes.object,
  setData: PropTypes.func,
  setNewData: PropTypes.func,
};

export default Index;
