import React from 'react';
import styles from './style.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import Axios from 'axios';
import { BASE_URL } from '../../../../constants/api';

const Index = () => {
  const [searchValue, setSearchVale] = useState('');

  const onSearch = async () => {
    try {
      const res = await Axios.get(`${BASE_URL}/addresses/search?keyword=${searchValue}`);
      console.log(res);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.address_wrap}>
      <form
        className={styles.form}
        onSubmit={e => {
          e.preventDefault();
          onSearch();
        }}
      >
        <div className={styles.address_search}>
          <input
            type="text"
            placeholder="시/군/구, 읍/면/동 단위로 입력하세요."
            onChange={e => {
              setSearchVale(e.target.value);
            }}
          />
          <button className={styles.btn}>
            <FontAwesomeIcon icon={faSearch} />
          </button>
        </div>
      </form>
      <div className={styles.address}>
        <ul>
          <li>
            <em>대구 광역시 북구 태전동</em>
          </li>
          <li>
            <em>대구 광역시 북구 태전동</em>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default Index;
