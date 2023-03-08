import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.module.css';
import { useState } from 'react';
import { useEffect } from 'react';
import Slide from '../../../components/Slide';

const Index = ({ img, imgCount }) => {
  const [imgClass, setImgClass] = useState(); //이미지 className 변경
  const [slideActive, setSlideActive] = useState(false);

  //이미지 갯수 조건문
  const handleImgClass = () => {
    if (imgCount == 1) {
      setImgClass(`${styles.one}`);
    } else if (imgCount == 2) {
      setImgClass(`${styles.two}`);
    } else if (imgCount == 3) {
      setImgClass(`${styles.three}`);
    } else if (imgCount >= 4) {
      setImgClass(`${styles.four}`);
    }
  };

  useEffect(() => {
    handleImgClass();
  }, [imgCount]);
  return (
    <>
      <div
        className={`${styles.post_img} ${imgClass}`}
        onClick={() => {
          setSlideActive(true);
        }}
      >
        <ul>
          {img[0] && (
            <li>
              <img src={img[0]} alt="이미지3" />
            </li>
          )}
          {img[1] && (
            <li>
              <img src={img[1]} alt="이미지3" />
            </li>
          )}
          {img[2] && (
            <li>
              <img src={img[2]} alt="이미지3" />
            </li>
          )}
        </ul>
      </div>
      {slideActive == true && <Slide img={img} setSlideActive={setSlideActive}></Slide>}
    </>
  );
};

Index.propTypes = {
  img: PropTypes.array,
  imgCount: PropTypes.number,
};

export default Index;
