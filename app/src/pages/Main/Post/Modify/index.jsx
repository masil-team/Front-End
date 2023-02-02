import React, { useRef, useState } from 'react';
import usePopupClose from '../../../../hooks/usePopupClose';
import styles from './style.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { useEffect } from 'react';
import axios from '../../../../utils/token';
import { BASE_URL } from '../../../../constants/api';

const Index = ({ item, data, setNewData }) => {
  const [modifyPopUp, setModifyPopUp] = useState(); //아이템의 id값이 들어옴
  const modify = useRef();
  const close = usePopupClose(modify);

  /* 영역외 클릭시 팝업창 닫기 */
  useEffect(() => {
    setModifyPopUp(close);
  }, [close]);

  const onPostDelete = async () => {
    try {
      const res = await axios.delete(`${BASE_URL}/posts/${item.id}`);
      console.log(res);
      onFilter();
    } catch (error) {
      console.log(error);
    }
  };

  const onFilter = () => {
    const copy = data && [...data];
    const newData = copy.filter(dataItem => {
      return dataItem.id !== item.id;
    });
    setNewData(newData);
  };

  return (
    <div
      ref={modify}
      className={styles.modify}
      onClick={() => {
        setModifyPopUp(item.id);
      }}
    >
      <FontAwesomeIcon icon={faEllipsisV} />
      {modifyPopUp == item.id && (
        <div className={styles.modify_box}>
          <ul>
            <li>
              <em>수정</em>
            </li>
            <li
              onClick={() => {
                onPostDelete();
              }}
            >
              <em>삭제</em>
            </li>
          </ul>
        </div>
      )}
    </div>
  );
};

Index.propTypes = {
  item: PropTypes.object,
  data: PropTypes.array,
  setNewData: PropTypes.func,
};

export default Index;
