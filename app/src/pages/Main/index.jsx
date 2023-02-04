import React, { useEffect, useRef, useState } from 'react';
import styles from './style.module.css';
import Nav from '../../components/Nav';
import Location from './Location';
import Post from './Post';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPlus } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router';
import axios from '../../utils/token';
import useTime from '../../hooks/useTime';
import { PATH } from '../../constants/path';

export const Main = () => {
  const navigate = useNavigate();

  const target = useRef(); //옵저버 타겟
  const [data, setData] = useState([]); //API 데이터 저장
  const [newData, setNewData] = useState([]); //시간 포맷팅된 새로운 데이터 저장
  const [loading, setLoading] = useState(false); //로딩

  let getList = sessionStorage.getItem('postList');
  getList = JSON.parse(getList);

  let getCategory = sessionStorage.getItem('category');
  getCategory = JSON.parse(getCategory);
  const [category, setCategory] = useState(getCategory);

  let getPageNum = sessionStorage.getItem('pageNum');
  getPageNum = JSON.parse(getPageNum);
  const [pageNum, setPageNum] = useState(getPageNum); //페이지 번호
  const [lastPage, setLastPage] = useState(); //마지막 페이지 확인

  //카테고리 변경
  function handleCategory(categoryNum) {
    setCategory(categoryNum);
    setData([]);
    setPageNum(0);
    sessionStorage.removeItem('postList');
  }

  useEffect(() => {
    if (getPageNum == null || getCategory == null) {
      setCategory(1);
      setPageNum(0);
    }
  }, []);

  useEffect(() => {
    if (getList == null || getList == undefined) {
      sessionStorage.setItem('postList', JSON.stringify([]));
    }
    if (getCategory == null || getList == undefined) {
      sessionStorage.setItem('category', JSON.stringify(1));
    }
    if (getPageNum == null || getList == undefined) {
      sessionStorage.setItem('pageNum', JSON.stringify(0));
    }
    if (getList) {
      getList.push(...newData);
      const filteredArr = getList.reduce((acc, current) => {
        const x = acc.find(item => item.id === current.id);
        if (!x) {
          return acc.concat([current]);
        } else {
          return acc;
        }
      }, []);
      sessionStorage.setItem('postList', JSON.stringify(filteredArr));
      sessionStorage.setItem('category', JSON.stringify(category));
      if (lastPage == true) {
        return;
      }
      sessionStorage.setItem('pageNum', JSON.stringify(pageNum));
    }
  }, [newData, category]);

  //데이터 호출 함수
  const handleData = async () => {
    setLoading(true); //로딩 시작 /boards/1/posts?rCode=11680&page=0&size=8
    const res = await axios.get(
      `http://13.209.94.72:8080/boards/${category}/posts?rCode=11110111&page=${pageNum}&size=8`,
    );
    setData(prev => [...prev, ...res.data.posts]); //기존의 data값과 새로운 data값을 복제해서 setData에 추가해줌
    handleTimeFilter(res.data.posts); //시간 포맷팅 함수
    setLastPage(res.data.isLast);
    setLoading(false); //로딩 끝
  };

  //옵저버가 타겟을 식별하게 되면 현재 페이지에 +1
  const loadMore = () => {
    setPageNum(prev => prev + 1);
  };

  //페이지 번호가 변경될때마다 데이터 호출 함수 실행
  useEffect(() => {
    handleData();
  }, [pageNum, category]);

  //옵저버가 타겟을 식별하게 되면 loadMore 함수 실행
  useEffect(() => {
    // let num = 1; // 페이지 호출 번호
    // const totalPage = 20; //총 페이지 수
    const observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting) {
        // num++; //페이지 호출 번호 증가시킴
        loadMore();
        if (lastPage == true) {
          //총 페이지 수 이상이거나 같으면 탐색중지
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
    const newData = [...data]; //데이터 값 복사

    /* 복사한 데이터 map으로 시간 값만 추출 */
    const timeData = newData.map(item => {
      return item.createDate;
    });
    setDay([...day, ...timeData]); //기존의 state값과 시간 추출 값을 spread로 배열합치기
  };

  /* time이 변경될때 마다 실행  */
  useEffect(() => {
    const newData = data && [...data]; //기존 데이터 복사
    /* 복사한 데이터의 시간 값을 포맷팅된 시간 값의로 변경후 배열로 저장 */
    const newTime =
      newData &&
      newData.map((item, index) => {
        item.newTime = time && time[index];
        return item;
      });
    setData(newTime);
    setNewData(newTime);
  }, [time, loading]);

  return (
    <>
      <Nav></Nav>
      <section className={styles.section}>
        <div className={styles.container}>
          <Location></Location>
          <div className={styles.top_nav}>
            <div className={styles.category}>
              <ul>
                <li
                  className={`${category === 1 && styles.active}`}
                  onClick={() => {
                    handleCategory(1);
                  }}
                >
                  <em>전체</em>
                </li>
                <li
                  className={`${category === 2 && styles.active}`}
                  onClick={() => {
                    handleCategory(2);
                  }}
                >
                  <em>동네소식</em>
                </li>
                <li
                  className={`${category === 3 && styles.active}`}
                  onClick={() => {
                    handleCategory(3);
                  }}
                >
                  <em>동네질문</em>
                </li>
                <li
                  className={`${category === 4 && styles.active}`}
                  onClick={() => {
                    handleCategory(4);
                  }}
                >
                  <em>일상</em>
                </li>
                <li
                  className={`${category === 5 && styles.active}`}
                  onClick={() => {
                    handleCategory(5);
                  }}
                >
                  <em>분실/실종</em>
                </li>
              </ul>
            </div>
            <div className={styles.writing} onClick={() => navigate(PATH.CREATE_POST)}>
              <button className={styles.btn}>
                <FontAwesomeIcon icon={faPlus} className={styles.icon} />
                <em>글쓰기</em>
              </button>
            </div>
          </div>
          <Post data={data} setData={setData} newData={newData} setNewData={setNewData}></Post>
          <button ref={target} className={`${styles.target_btn} ir_pm`}>
            Load More
          </button>
        </div>
      </section>
    </>
  );
};

export default Main;
