import React from 'react';
import styles from './style.module.css';
import { useState } from 'react';
import { useEffect } from 'react';

const Index = () => {
  const [imgCount] = useState(4); //이미지 갯수 카운트
  const [imgClass, setImgClass] = useState(); //이미지 className 변경

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
    <div className={`${styles.post_img} ${imgClass}`}>
      <ul>
        <li>
          <img src={`${process.env.PUBLIC_URL}/images/test/background.jpg`} alt="" />
        </li>
        <li>
          <img src={`${process.env.PUBLIC_URL}/images/test/post1.jpg`} alt="" />
        </li>
        <li>
          <img src={`${process.env.PUBLIC_URL}/images/test/post2.jpg`} alt="" />
        </li>
      </ul>
    </div>
  );
};

export default Index;
