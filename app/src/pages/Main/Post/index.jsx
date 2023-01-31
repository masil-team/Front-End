import React, { useEffect, useRef, useState } from 'react';
import styles from './style.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStreetView, faHeart, faComment, faBookmark } from '@fortawesome/free-solid-svg-icons';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
//import { PATH } from '../../../constants/path';
import Modify from './Modify';
import useTime from '../../../hooks/useTime';

const Index = () => {
  const navigate = useNavigate();
  const [data, setData] = useState([]); //API 데이터 저장
  const [newData, setNewData] = useState([]); //시간 포맷팅된 새로운 데이터 저장
  const [pageNum, setPageNum] = useState(0); //페이지 번호
  const [, /*loading */ setLoading] = useState(false); //로딩
  const target = useRef(); //옵저버 타겟
  const [lastPage, setLastPage] = useState(); //마지막 페이지 확인

  //데이터 호출 함수
  const handleData = async () => {
    setLoading(true); //로딩 시작
    const res = await axios.get(`http://13.209.94.72:8080/boards/${1}/posts?page=${pageNum}&size=8`);
    setData([...data, ...res.data.posts]); //기존의 data값과 새로운 data값을 복제해서 setData에 추가해줌
    handleTimeFilter(res.data.posts); //시간 포맷팅 함수
    setLastPage(res.data.isLast);
    setLoading(false); //로딩 끝
  };

  //옵저버가 타겟을 식별하게 되면 현재 페이지에 +1
  const loadMore = () => setPageNum(prev => prev + 1);

  //페이지 번호가 변경될때마다 데이터 호출 함수 실행
  useEffect(() => {
    handleData();
  }, [pageNum]);

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
  }, []);

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
    const newData = [...data]; //기존 데이터 복사
    /* 복사한 데이터의 시간 값을 포맷팅된 시간 값의로 변경후 배열로 저장 */
    const newTime = newData.map((item, index) => {
      item.newTime = time && time[index];
      return item;
    });
    setData(newTime);
    setNewData(newTime);
  }, [time]);

  return (
    <div className={styles.post_wrap}>
      {newData && (
        <ul>
          {newData &&
            newData.map((item, index) => {
              return (
                <li key={index}>
                  <div className={styles.post}>
                    <div className={styles.info}>
                      <div className={styles.user_info}>
                        <div className={styles.user_img}></div>
                        <div className={styles.user}>
                          <div className={styles.user_name}>
                            <h4>{item.member.nickname}</h4>
                          </div>
                          <div className={styles.user_address}>
                            <ul>
                              <li>
                                <FontAwesomeIcon icon={faStreetView} />
                                <em>북구</em>
                              </li>
                              <li>
                                <em>{item.newTime}</em>
                              </li>
                            </ul>
                          </div>
                        </div>
                      </div>
                      <Modify item={item}></Modify>
                    </div>
                    <div
                      className={styles.text_wrap}
                      onClick={() => {
                        navigate(`/post/${item.id}`);
                      }}
                    >
                      <div className={styles.img}></div>
                      <div className={styles.text}>
                        <p>{item.content}</p>
                      </div>
                    </div>
                    <div className={styles.sns}>
                      <ul>
                        <li>
                          <FontAwesomeIcon icon={faHeart} className={styles.icon} />
                          <em>{item.commentCount}</em>
                        </li>
                        <li>
                          <FontAwesomeIcon icon={faComment} className={styles.icon} />
                          <em>{item.likeCount}</em>
                        </li>
                        <li>
                          <FontAwesomeIcon icon={faBookmark} className={styles.icon} />
                          <em>1</em>
                        </li>
                      </ul>
                    </div>
                    <div className={styles.category}>
                      <ul>
                        <li>
                          <em>동네소식</em>
                        </li>
                      </ul>
                    </div>
                  </div>
                </li>
              );
            })}
        </ul>
      )}
      <button ref={target} className="ir_pm">
        Load More
      </button>
    </div>
  );
};

export default Index;
