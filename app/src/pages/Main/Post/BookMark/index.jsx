import React, { useEffect, useState } from 'react';
import styles from '../style.module.css';
import axios from '../../../../utils/token';
import PropTypes from 'prop-types';
import filterArray from '../../../../utils/arrayFilter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBookmark } from '@fortawesome/free-solid-svg-icons';
import { BASE_URL } from '../../../../constants/api';

const Index = ({ item }) => {
  const [bookColor, setBookColor] = useState();
  let getList = sessionStorage.getItem('postList');
  getList = JSON.parse(getList);

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
        className={`${styles.icon} ${bookColor == true && styles.book_active}`}
        onClick={() => {
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
