import React from 'react';
import PropTypes from 'prop-types';
import styles from '../style.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { BASE_URL } from '../../../constants/api';
import axios from '../../../utils/token';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../../constants/path';
import userCheck from '../../../utils/userCheck';

const Index = ({ data, postHandleData }) => {
  //유저 여부 확인
  const user = userCheck();
  const navigate = useNavigate();

  //좋아요 api 호출
  const onDataLike = async () => {
    try {
      await axios.put(`${BASE_URL}/posts/${data.id}/like`);
      postHandleData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={`${styles.heart} ${data.isLiked == true && styles.active}`}>
      <FontAwesomeIcon
        icon={faHeart}
        onClick={() => {
          if (user == false) {
            navigate(PATH.LOGIN);
            return;
          }
          onDataLike();
        }}
      />
    </div>
  );
};

Index.propTypes = {
  data: PropTypes.object,
  postHandleData: PropTypes.func,
};

export default Index;
