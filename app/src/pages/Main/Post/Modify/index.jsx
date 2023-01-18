import React, { useRef, useState } from 'react';
import usePopupClose from '../../../../hooks/usePopupClose';
import styles from './style.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEllipsisV } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

const Index = ({ item }) => {
  const [modifyPopUp, setModifyPopUp] = useState(); //아이템의 id값이 들어옴
  const modify = useRef();
  const close = usePopupClose(modify);

  /* 영역외 클릭시 팝업창 닫기 */
  useEffect(() => {
    setModifyPopUp(close);
  }, [close]);
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
            <li>
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
};

export default Index;
