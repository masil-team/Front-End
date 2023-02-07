import styles from './style.module.css';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { useEffect } from 'react';

const GridItem = ({ image, setImage, count, setCount }) => {
  const handleClick = i => {
    if (count === 0) {
      alert('남아있는 사진이 없습니다.');
    } else {
      setImage(prev => {
        const copyBoard = [...prev];
        copyBoard.splice(i, 1);
        return [...copyBoard];
      });
      setCount(prev => prev - 1);
    }
  };
  useEffect(() => {}, [count]);
  return (
    <div className={styles.gridContainer}>
      <div className={styles.gridBox}>
        {image.map((v, i) => {
          return (
            <div className={styles.gridItem} key={v}>
              <div className={styles.overView}>
                <FontAwesomeIcon onClick={() => handleClick(i)} className={styles.icon} icon={faTrash} />
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
GridItem.propTypes = {
  image: PropTypes.array,
  setImage: PropTypes.func,
  count: PropTypes.number,
  setCount: PropTypes.func,
};
export default GridItem;
