import React, { useEffect, useState } from 'react';
import styles from '../style.module.css';

import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import axios from '../../../utils/token';
import { BASE_URL } from '../../../constants/api';
import filterArray from '../../../utils/arrayFilter';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../../constants/path';
import userCheck from '../../../utils/userCheck';

const Index = ({ item }) => {
  const [bookColor, setBookColor] = useState();
  let getList = sessionStorage.getItem('postList');
  getList = JSON.parse(getList);

  //유저 여부 확인
  const user = userCheck();
  const navigate = useNavigate();

  //북마크 추가,삭제
  const onBookMark = async id => {
    try {
      let res;
      if (bookColor == false) {
        res = await axios.post(`${BASE_URL}/posts/${id}/bookmark`);
      } else {
        res = await axios.delete(`${BASE_URL}/posts/${id}/bookmark`);
      }
      let targetItem = getList.filter(list => {
        return list.id == item.id;
      });
      targetItem[0].isScrap = res.data.isScrap;
      const newArray = [...getList, ...targetItem];
      const filteredArr = filterArray(newArray);
      sessionStorage.setItem('postList', JSON.stringify(filteredArr));
      setBookColor(res.data.isScrap);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (item.isScrap == true) {
      setBookColor(true);
    } else {
      setBookColor(false);
    }
  }, []);
  return (
    <li>
      <FontAwesomeIcon
        icon={faBookmark}
        className={`${styles.book_mark} ${bookColor == true && styles.book_active}`}
        onClick={() => {
          if (user == false) {
            navigate(PATH.LOGIN);
            return;
          }
          onBookMark(item.id);
        }}
      />
    </li>
  );
};

Index.propTypes = {
  item: PropTypes.object,
};

export default Index;
