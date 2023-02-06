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

  //세션에 게시글 목록 저장
  let getList = sessionStorage.getItem('postList');
  getList = JSON.parse(getList);
  const [postList, setPostList] = useState(getList);

  //세션에 게시글 카테고리 저장
  let getCategory = sessionStorage.getItem('category');
  getCategory = JSON.parse(getCategory);
  const [category, setCategory] = useState(getCategory);

  //세션에 게시글 페이지 넘버 저장
  let getPageNum = sessionStorage.getItem('pageNum');
  getPageNum = JSON.parse(getPageNum);
  const [pageNum, setPageNum] = useState(getPageNum); //페이지 번호
  const [lastPage, setLastPage] = useState(); //마지막 페이지 확인

  //세션에 게시글 주소 정보 저장
  let getAddressInfo = sessionStorage.getItem('addressInfo');
  getAddressInfo = JSON.parse(getAddressInfo);
  const [address, setAddress] = useState(getAddressInfo); //게시글 주소 설정

  //카테고리 변경
  function handleCategory(categoryNum) {
    setCategory(categoryNum);
    setData([]);
    setPageNum(0);
    sessionStorage.setItem('pageNum', JSON.stringify(0));
    sessionStorage.removeItem('postList');
  }

  useEffect(() => {
    if (pageNum != null && address != null) {
      handleData();
    }
  }, [address]);

  //세션 초기값 세팅
  function initValue() {
    if (getAddressInfo == null || getAddressInfo == undefined) {
      setAddress({ emdName: '옥인동', sggName: '종로구', sidoName: '서울특별시', rcode: 11110111 });
      sessionStorage.setItem('addressInfo', JSON.stringify(address));
    }
    if (getList == null || getList == undefined) {
      sessionStorage.setItem('postList', JSON.stringify([]));
    }
    if (getCategory == null || getCategory == undefined) {
      setCategory(1);
      sessionStorage.setItem('category', JSON.stringify(1));
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

      //세션에 있는 주소 정보와 filteredArr의 주소를 비교해서 해당하는 주소만 필터함
      const newArray = filteredArr.filter(item => {
        return (
          item.address == getAddressInfo.emdName ||
          item.address == getAddressInfo.sggName ||
          item.address == getAddressInfo.sidoName
        );
      });
      sessionStorage.setItem('postList', JSON.stringify(newArray));
      sessionStorage.setItem('category', JSON.stringify(category));
      setPostList(newArray);
      if (lastPage == true) {
        return;
      }
      sessionStorage.setItem('pageNum', JSON.stringify(pageNum));
    }
  }, [newData, category]);

  //데이터 호출 함수
  const handleData = async () => {
    try {
      const res = await axios.get(
        `http://13.209.94.72:8080/boards/${category}/posts?rCode=${address.rcode}&page=${pageNum}&size=8`,
      );
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
    if (pageNum != null && address != null) {
      handleData();
    }
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
          <Location setAddress={setAddress} handleData={handleData} setPageNum={setPageNum}></Location>
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
          <Post data={data} setData={setData} newData={newData} setNewData={setNewData} postList={postList}></Post>
          <button ref={target} className={`${styles.target_btn} ir_pm`}>
            Load More
          </button>
        </div>
      </section>
    </>
  );
};

export default Main;
