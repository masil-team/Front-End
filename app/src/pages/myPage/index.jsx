import React, { useEffect, useState } from 'react';
import styles from './style.module.css';
import Nav from '../../components/Nav';
import { Outlet } from 'react-router-dom';
import Category from './Category';
import { AnimatePresence } from 'framer-motion';
import { motion } from 'framer-motion';
const overlayEf = {
  initial: {
    opacity: 0,
  },
  animate: {
    opacity: 0.6,
    tranisition: { duration: 0.6, delay: 2 },
  },
  exit: {
    opacity: 0,
  },
};

export const MyPage = () => {
  const [width, setWidth] = useState(window.innerWidth);
  const [show, setShow] = useState(false);
  useEffect(() => {
    window.onresize = () => {
      setWidth(window.innerWidth);
    };
  }, [window.innerWidth]);
  return (
    <>
      <Nav />
      <div className={styles.container}>
        <div className={styles.innerContainer}>
          <Category width={width} show={show} setShow={setShow} />
          <div className={styles.outletWrap}>
            <div className={styles.outletContainer}>
              <AnimatePresence>
                {show && (
                  <motion.div
                    variants={overlayEf}
                    initial="initial"
                    animate="animate"
                    exit="exit"
                    className={styles.OverLay}
                  />
                )}
              </AnimatePresence>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default MyPage;
