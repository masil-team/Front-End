import React from 'react';
import PropTypes from 'prop-types';
import styles from './style.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import Axios from 'axios';
import { BASE_URL } from '../../../../constants/api';

const Index = ({ setAddress, setPopUp, setLocation, setPageNum }) => {
  const [searchValue, setSearchVale] = useState('');
  const [searchData, setSearchData] = useState([]);

  const onSearch = async () => {
    try {
      const res = await Axios.get(`${BASE_URL}/addresses/search?keyword=${searchValue}`);
      setSearchData(res.data);
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
          if (searchValue.length < 2) {
            alert('2글자 이상 입력해주세요.');
            return;
          }
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
        {searchData && (
          <ul>
            {searchData &&
              searchData.map(item => {
                return (
                  <li
                    key={item.rcode}
                    onClick={() => {
                      setPageNum(0);
                      sessionStorage.setItem('pageNum', JSON.stringify(0));
                      setAddress(item);
                      sessionStorage.setItem('addressInfo', JSON.stringify(item));
                      setLocation(true);
                      setPopUp(false);
                    }}
                  >
                    <em>{item.rname}</em>
                  </li>
                );
              })}
          </ul>
        )}
        {searchData && searchData.length == 0 && (
          <div className={styles.non_search}>
            <em>검색 결과가 없습니다</em>
          </div>
        )}
      </div>
    </div>
  );
};

Index.propTypes = {
  setAddress: PropTypes.func,
  setPopUp: PropTypes.func,
  setLocation: PropTypes.func,
  setPageNum: PropTypes.func,
};

export default Index;
