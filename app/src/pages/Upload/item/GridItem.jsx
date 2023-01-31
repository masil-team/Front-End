import styles from './style.module.css';
import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrash } from '@fortawesome/free-solid-svg-icons';
import PropTypes from 'prop-types';
import { motion } from 'framer-motion';
import { useEffect } from 'react';
import { useRef } from 'react';
import { useState } from 'react';

const GridItem = ({ image, setImage, count, setCount }) => {
  const [boardWidth, setBoardWidth] = useState(0);
  const [width, setWidth] = useState(window.innerWidth);
  const gridContainer = useRef(null);
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
  useEffect(() => {
    setBoardWidth(gridContainer.current?.scrollWidth - gridContainer.current?.offsetWidth);
    const windowResize = () => {
      setWidth(window.innerWidth);
    };
    window.addEventListener('resize', windowResize);
    return () => {
      window.removeEventListener('resize', windowResize);
    };
  }, [count]);
  return (
    <div ref={gridContainer} className={styles.gridContainer}>
      <motion.div
        key={width}
        drag={width < 769 && 'x'}
        className={styles.gridBox}
        dragConstraints={{ right: 0, left: -boardWidth }}
      >
        {image.map((v, i) => {
          return (
            <div className={styles.gridItem} key={v}>
              <div className={styles.overView}>
                <FontAwesomeIcon onClick={() => handleClick(i)} className={styles.icon} icon={faTrash} />
              </div>
            </div>
          );
        })}
      </motion.div>
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
