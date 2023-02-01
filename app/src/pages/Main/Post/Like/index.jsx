import React from 'react';
import styles from '../style.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import axios from '../../../../utils/token';
import { BASE_URL } from '../../../../constants/api';
import { useState } from 'react';
import { useEffect } from 'react';

const Index = ({ item }) => {
  const [like, setLike] = useState(item.likeCount); //좋아요 저장
  const [likeColor, setLikeColor] = useState();
  const onDataLike = async () => {
    try {
      const res = await axios.put(`${BASE_URL}/posts/${item.id}/like`);
      if (res.data.isLike === true) {
        setLike(prev => prev + 1);
        setLikeColor(true);
      } else {
        setLike(prev => prev - 1);
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
        className={`${styles.icon} ${likeColor == true && styles.active}`}
        onClick={() => {
          onDataLike();
        }}
      />
      <em>{like}</em>
    </li>
  );
};

Index.propTypes = {
  item: PropTypes.object,
};

export default Index;
