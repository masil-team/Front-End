import React, { useEffect, useRef, useState } from 'react';
import styles from './style.module.css';
import Nav from '../../components/Nav';
import Post from './Post';
import axios from '../../utils/token';
import useTime from '../../hooks/useTime';
import { BASE_URL } from '../../constants/api';

export const Search = () => {
  const target = useRef(); //옵저버 타겟
  const [data, setData] = useState([]); //API 데이터 저장
  const [newData, setNewData] = useState([]); //시간 포맷팅된 새로운 데이터 저장

  let value = sessionStorage.getItem('searchValue');
  value = JSON.parse(value);

  //세션에 검색 목록 저장
  let getList = sessionStorage.getItem('searchList');
  getList = JSON.parse(getList);
  const [postList, setPostList] = useState(getList);

  //세션에 게시글 페이지 넘버 저장
  let getPageNum = sessionStorage.getItem('pageNum');
  getPageNum = JSON.parse(getPageNum);
  const [pageNum, setPageNum] = useState(getPageNum); //페이지 번호
  const [lastPage, setLastPage] = useState(); //마지막 페이지 확인

  //세션에 게시글 주소 정보 저장
  let getSearchAddress = sessionStorage.getItem('searchAddress');
  let getAddressInfo = sessionStorage.getItem('addressInfo');
  getSearchAddress = JSON.parse(getSearchAddress);
  getAddressInfo = JSON.parse(getAddressInfo);
  const [address, setAddress] = useState(getSearchAddress || getAddressInfo); //게시글 주소 설정

  //세션 초기값 세팅
  function initValue() {
    if (getAddressInfo == null || getAddressInfo == undefined) {
      setAddress({ emdName: '옥인동', sggName: '종로구', sidoName: '서울특별시', emdId: 11110111 });
      sessionStorage.setItem('addressInfo', JSON.stringify(address));
    }
    if (getList == null || getList == undefined) {
      sessionStorage.setItem('searchList', JSON.stringify([]));
    }
    if (getPageNum == null || getPageNum == undefined) {
      setPageNum(0);
      sessionStorage.setItem('pageNum', JSON.stringify(0));
    }
  }

  useEffect(() => {
    initValue();
    if (getList) {
      getList.push(...newData);

      //중복값 필터
      const filteredArr = getList.reduce((acc, current) => {
        const x = acc.find(item => item.id === current.id);
        if (!x) {
          return acc.concat([current]);
        } else {
          return acc;
        }
      }, []);

      sessionStorage.setItem('searchList', JSON.stringify(filteredArr));
      setPostList(filteredArr);
      if (lastPage == true) {
        return;
      }
      sessionStorage.setItem('pageNum', JSON.stringify(pageNum));
    }
  }, [newData]);

  //데이터 호출 함수
  const handleData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/posts/search?keyword=${value}&&rCode=${address.emdId}&page=${pageNum}`);
      setData(prev => [...prev, ...res.data.posts]); //기존의 data값과 새로운 data값을 복제해서 setData에 추가해줌
      handleTimeFilter(res.data.posts);
      setLastPage(res.data.isLast);
    } catch (error) {
      console.log(error);
    }
  };

  //옵저버가 타겟을 식별하게 되면 현재 페이지에 +1
  const loadMore = () => {
    setPageNum(prev => prev + 1);
  };

  //페이지 번호가 변경될때마다 데이터 호출 함수 실행
  useEffect(() => {
    if (pageNum != null) {
      handleData();
    }
  }, [pageNum]);

  //옵저버가 타겟을 식별하게 되면 loadMore 함수 실행
  useEffect(() => {
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        loadMore();
        if (lastPage == true) {
          observer.unobserve(target.current); //옵저버 타겟 변수 이름 / Ref.current
        }
      }
    });
    observer.observe(target.current); //옵저버 타겟 변수 이름 / Ref.current
  }, [target]);

  // 날짜 포맷팅
  const [day, setDay] = useState([]); //데이터의 날짜 저장
  const time = useTime(day); //커스텀훅 매개변수 배열로 전달 해야함

  const handleTimeFilter = data => {
    setDay([...day, ...data]);
  };

  /* time이 변경될때 마다 실행  */
  useEffect(() => {
    const dataCopy = [...data];

    const filteredArr = dataCopy.reduce((acc, current) => {
      const x = acc.find(item => item.id === current.id);
      if (!x) {
        return acc.concat([current]);
      } else {
        return acc;
      }
    }, []);
    const newArray = filteredArr.filter((item, index) => {
      const newItem = (item.newTime = time[index]);
      return newItem;
    });
    setNewData(newArray);
  }, [time]);

  return (
    <>
      <Nav></Nav>
      <section className={styles.section}>
        <div className={styles.container}>
          <Post data={data} setData={setData} newData={newData} setNewData={setNewData} postList={postList}></Post>
          <button ref={target} className={`${styles.target_btn} ir_pm`}>
            Load More
          </button>
        </div>
      </section>
    </>
  );
};

export default Search;
