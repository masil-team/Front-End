import React from 'react';
import styles from './style.module.css';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSearch, faTimes } from '@fortawesome/free-solid-svg-icons';
import { useLocation, useNavigate } from 'react-router-dom';
import { PATH } from '../../../constants/path';
import { useState } from 'react';
import usePopupClose from '../../../hooks/usePopupClose';
import { useRef } from 'react';
import { useEffect } from 'react';
import Address from './Address';

const Index = () => {
  const navigate = useNavigate();
  const target = useRef(null);
  const optionClose = usePopupClose(target);
  const [focus, setFocus] = useState(); //주소 및 검색어 저장 팝업창
  const location = useLocation();

  //현재 주소
  let addressInfo = sessionStorage.getItem('addressInfo');
  let searchAddress = sessionStorage.getItem('searchAddress'); //세션 검색 주소 저장
  addressInfo = JSON.parse(addressInfo);
  searchAddress = JSON.parse(searchAddress);
  const [addressChange, setAddressChange] = useState(false);

  //최근 검색어 저장
  let searchWord = sessionStorage.getItem('searchWord');
  searchWord = JSON.parse(searchWord);
  const [word, setWord] = useState(searchWord);

  //검색어 저장
  let value = sessionStorage.getItem('searchValue');
  value = JSON.parse(value);
  const [searchValue, setSearchValue] = useState(location.pathname == '/search' && value);

  //저장된 검색어 삭제
  const onDelete = Titem => {
    const newSave = word?.filter(item => {
      return item != Titem;
    });
    sessionStorage.setItem('searchWord', JSON.stringify(newSave));
    setWord(newSave);
  };

  useEffect(() => {
    if (searchWord == null || searchWord == undefined) {
      sessionStorage.setItem('searchWord', JSON.stringify([]));
    }
  }, []);

  useEffect(() => {
    setFocus(optionClose);
    focus == false && setAddressChange(false);
  }, [optionClose]);

  return (
    <div className={styles.container} ref={target}>
      <form className={styles.form}>
        <div className={styles.search}>
          <button
            className={styles.btn}
            onClick={e => {
              e.preventDefault();
              searchWord.push(searchValue);
              searchWord = new Set(searchWord);
              searchWord = Array.from(searchWord);
              sessionStorage.setItem('searchWord', JSON.stringify(searchWord));
              setWord(searchWord);
              sessionStorage.setItem('searchValue', JSON.stringify(searchValue));
              navigate(PATH.SEARCH);
              sessionStorage.removeItem('searchList');
              window.location.reload();
            }}
          >
            <FontAwesomeIcon icon={faSearch} />
          </button>
          <input
            type="text"
            placeholder="검색어를 입력하세요"
            className={`${focus == true && styles.active}`}
            onChange={e => {
              setSearchValue(e.target.value);
            }}
            value={searchValue || ''}
          />
        </div>
      </form>
      {focus == true && (
        <div className={styles.option}>
          <div className={styles.address}>
            <em>검색 주소 : {(searchAddress && searchAddress.emdName) || (addressInfo && addressInfo.emdName)}</em>
            <button
              onClick={() => {
                setAddressChange(!addressChange);
              }}
            >
              주소 변경
            </button>
          </div>
          <div className={styles.search_word}>
            <ul>
              {word &&
                word.map((item, index) => {
                  return (
                    <li key={index}>
                      <em
                        onClick={e => {
                          setSearchValue(e.target.textContent);
                          sessionStorage.setItem('searchValue', JSON.stringify(e.target.textContent));
                          navigate(PATH.SEARCH);
                          sessionStorage.removeItem('searchList');
                          window.location.reload();
                        }}
                      >
                        {item}
                      </em>
                      <FontAwesomeIcon
                        icon={faTimes}
                        className={styles.icon}
                        onClick={() => {
                          onDelete(item);
                        }}
                      />
                    </li>
                  );
                })}
            </ul>
          </div>
          {addressChange == true && <Address setAddressChange={setAddressChange}></Address>}
        </div>
      )}
    </div>
  );
};

Index.propTypes = {
  setSearch: PropTypes.func,
};

export default Index;
