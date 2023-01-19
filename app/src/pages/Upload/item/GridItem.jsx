import styles from './style.module.css';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';

const GridItem = () => {
  const [arr, setArr] = useState([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);

  const handleClick = i => {
    setArr(prev => {
      const copyBoard = [...prev];
      copyBoard.splice(i, 1);
      return [...copyBoard];
    });
  };

  return (
    <div className={styles.gridBox}>
      {arr.map((v, i) => {
        return (
          <div className={styles.gridItem} key={v}>
            <div className={styles.overView}>
              <FontAwesomeIcon onClick={() => handleClick(i)} className={styles.icon} icon={faTrash} />
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default GridItem;
