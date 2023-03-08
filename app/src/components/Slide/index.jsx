import React from 'react';
import PropTypes from 'prop-types';

import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import 'swiper/css/navigation';
import { Pagination, Navigation } from 'swiper';

import styles from './style.module.css';

export default function App({ img, setSlideActive }) {
  return (
    <div className={styles.slider}>
      <Swiper
        pagination={{
          type: 'fraction',
        }}
        navigation={true}
        modules={[Pagination, Navigation]}
        loop={true}
        speed={1000}
        className="mySwiper"
      >
        <div>
          {img &&
            img[0].map((item, index) => {
              return (
                <SwiperSlide key={index}>
                  <div
                    className={styles.slide}
                    onClick={() => {
                      setSlideActive(false);
                    }}
                  >
                    <div className={styles.slide_img}>
                      <img src={item.url} alt="슬라이드 이미지" />
                    </div>
                  </div>
                </SwiperSlide>
              );
            })}
        </div>
      </Swiper>
    </div>
  );
}

App.propTypes = {
  img: PropTypes.array,
  setSlideActive: PropTypes.func,
};
