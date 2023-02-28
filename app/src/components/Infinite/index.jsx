import React, { useState, useEffect } from 'react';
import { useMatch } from 'react-router-dom';
import { BASE_URL } from '../../constants/api';
import Card from '../../pages/myPage/Bookmark/Card';
import axios from '../../utils/token';
import useTime from '../../hooks/useTime';

function Infinite() {
  const bookMark = useMatch('/mypage/bookmark');
  const like = useMatch('/mypage/like');
  const [page, setPage] = useState(0);
  const [last, setLast] = useState(false);
  let myPageList = sessionStorage.getItem('myPageList');
  myPageList = JSON.parse(myPageList);
  // let likeList = sessionStorage.getItem('likeList');
  const [data, setData] = useState([]);
  const [newData, setNewData] = useState([]);
  const [postList, setPostList] = useState(myPageList);

  const getBookData = async () => {
    const res = bookMark
      ? await axios.get(`${BASE_URL}/boards/1/posts?rCode=11110111&page=${page}&size=8`)
      : await axios.get(`${BASE_URL}/boards/1/posts?rCode=11110111&page=${page}&size=8`);

    setData(prev => [...prev, ...res.data.posts]);
    handleTimeFilter(res.data.posts);
    setLast(res.data.isLast);
  };

  function initialValue() {
    if (myPageList === null || myPageList === undefined) {
      sessionStorage.setItem('myPageList', JSON.stringify([]));
    }
    // if (likeList === null || likeList === undefined) {
    //   sessionStorage.setItem('likeList', JSON.stringify([]));
    // }
  }
  useEffect(() => {
    initialValue();
    if (myPageList) {
      console.log(myPageList);
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
      if (last == true) {
        return;
      }
    }
  }, [newData]);

  useEffect(() => {
    getBookData();
  }, [page, bookMark, like]);

  const onScroll = () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight) {
      setPage(page + 1);
      sessionStorage.setItem('myPageNumber', page);
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
  return <Card postList={postList} />;
}

export default Infinite;
