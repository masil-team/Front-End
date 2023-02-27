import React from 'react';
import styles from '../style.module.css';
import PropTypes from 'prop-types';
import useTime from '../../../../../hooks/useTime';
import { useState } from 'react';

const Index = ({ item }) => {
  const [data] = useState([item]);
  const time = useTime(data);
  return (
    <div className={styles.time}>
      <em>{time}</em>
    </div>
  );
};

Index.propTypes = {
  item: PropTypes.object,
};

export default Index;
