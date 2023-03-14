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
        {img[0].length != 0 && (
          <ul>
            {img[0][0] && (
              <li>
                <img src={img[0][0].url} alt="이미지3" />
              </li>
            )}
            {img[0][1] && (
              <li>
                <img src={img[0][1].url} alt="이미지3" />
              </li>
            )}
            {img[0][2] && (
              <li>
                <img src={img[0][2].url} alt="이미지3" />
                {imgCount >= 4 && (
                  <div className={styles.more}>
                    <em>+{imgCount - 3}</em>
                  </div>
                )}
              </li>
            )}
          </ul>
        )}
      </div>
      {slideActive == true && <Slide img={img[0]} setSlideActive={setSlideActive}></Slide>}
    </>
  );
};

Index.propTypes = {
  img: PropTypes.array,
  imgCount: PropTypes.number,
};

export default Index;
