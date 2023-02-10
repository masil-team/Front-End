import axios from '../utils/token';
import { useEffect, useState } from 'react';
import useTime from './useTime';

export default function usePostList(target, deleteData) {
  const [data, setData] = useState([]); //API 데이터 저장
  const [newData, setNewData] = useState([]); //시간 포맷팅된 새로운 데이터 저장
  const [pageNum, setPageNum] = useState(0); //페이지 번호
  const [, /*loading */ setLoading] = useState(false); //로딩
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

  //게시글 삭제시 삭제된 데이터를 data에 저장
  useEffect(() => {
    setData(deleteData);
  }, [deleteData]);

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

  return newData;
}
