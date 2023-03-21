import React, { useState, useEffect } from 'react';
import { useMatch } from 'react-router-dom';
import { BASE_URL } from '../../constants/api';
import BookCard from '../../pages/myPage/Bookmark/Card';
import LikeCard from '../../pages/myPage/Like/Card';
import axios from '../../utils/token';
import useTime from '../../hooks/useTime';
import MyPostCard from '../../pages/myPage/MyPost/Card';

function Infinite() {
  const bookMark = useMatch('/mypage/bookmark');
  const like = useMatch('/mypage/like');
  const myPost = useMatch('/mypage/mypost');
  ////
  let getPageNum = sessionStorage.getItem('myPageNum');
  getPageNum = JSON.parse(getPageNum);
  const [pageNum, setPageNum] = useState(getPageNum); //페이지 번호/my/comment
  const [lastPage, setLastPage] = useState(); //마지막 페이지 확인
  ////
  let myPageList = sessionStorage.getItem('myPageList');
  myPageList = JSON.parse(myPageList);
  ///
  const [data, setData] = useState([]);
  const [newData, setNewData] = useState([]);
  /////
  const userInfo = JSON.parse(sessionStorage.getItem('user'));
  const memberId = userInfo.id;
  const [postList, setPostList] = useState(myPageList);
  const getBookData = async () => {
    try {
      const res = bookMark
        ? await axios.get(`${BASE_URL}/bookmarks?page=${pageNum}&size=8`)
        : like
        ? await axios.get(`${BASE_URL}/members/${memberId}/my/post-likes`)
        : myPost && (await axios.get(`${BASE_URL}/members/${memberId}/my/posts`));
      setData(prev => [...prev, ...res.data.posts]);
      handleTimeFilter(res.data.posts);
      setLastPage(res.data.isLast);
    } catch (err) {
      console.log(err);
    }
  };
  function initialValue() {
    if (myPageList === null || myPageList === undefined) {
      sessionStorage.setItem('myPageList', JSON.stringify([]));
    }
    if (getPageNum === null || getPageNum === undefined) {
      setPageNum(0);
      sessionStorage.setItem('myPageNum', JSON.stringify(0));
    }
  }

  useEffect(() => {
    initialValue();

    if (myPageList) {
      myPageList.push(...newData);
      const filteredArr = myPageList.reduce((acc, current) => {
        const x = acc.find(item => item.id === current.id);
        if (!x) {
          return acc.concat([current]);
        } else {
          return acc;
        }
      }, []);
      sessionStorage.setItem('myPageList', JSON.stringify(filteredArr));
      setPostList(filteredArr);
      if (lastPage == true) {
        return;
      }
    }
  }, [newData, pageNum]);

  useEffect(() => {
    if (bookMark || like || myPost) sessionStorage.removeItem('myPageList');
    sessionStorage.removeItem('myPageNum');
    getBookData();
  }, [pageNum, bookMark, like, myPost]);

  const onScroll = () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight) {
      if (lastPage === true) {
        return;
      }
      setPageNum(prev => prev + 1);
      sessionStorage.setItem('myPageNum', pageNum);
    }
  };

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

  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [data]);
  return (
    <>
      {bookMark && <BookCard postList={postList} setData={setData} setNewData={setNewData} />}{' '}
      {like && <LikeCard postList={postList} setData={setData} setNewData={setNewData} />}
      {myPost && <MyPostCard postList={postList} setData={setData} setNewData={setNewData} />}
      {/* {myPost && <MyPost postList={postList} setData={setData} setNewData={setNewData} />} */}
    </>
  );
}

export default Infinite;
