import React, { useState, useEffect } from 'react';
import { useMatch } from 'react-router-dom';
import { BASE_URL } from '../../constants/api';
import Card from '../../pages/myPage/Bookmark/Card';
import axios from '../../utils/token';

function Infinite() {
  const bookMark = useMatch('/mypage/bookmark');
  const like = useMatch('/mypage/like');
  const [items, setItems] = useState([]);
  // const [setHasMore] = useState(true);
  const [page, setPage] = useState(0);
  const bookMarkList = sessionStorage.getItem('bookMarkList');
  const likeList = sessionStorage.getItem('likeList');
  const getBookData = async () => {
    const res = await axios.get(`${BASE_URL}/boards/1/posts?rCode=11110111&page=${page}&size=8`);
    setItems([...items, ...res.data.posts]);
    sessionStorage.setItem('bookMarkList', JSON.stringify([...JSON.parse(bookMarkList), ...res.data.posts]));
  };
  const getLikeData = async () => {
    const res = await axios.get(`${BASE_URL}/boards/1/posts?rCode=11110111&page=${page}&size=8`);
    setItems([...items, ...res.data.posts]);
  };
  function initialValue() {
    if (bookMarkList === null || bookMarkList === undefined) {
      sessionStorage.setItem('bookMarkList', []);
    }
    if (likeList === null || likeList === undefined) {
      sessionStorage.setItem('likeList', []);
    }
  }
  console.log(items, bookMarkList);
  //session stroage 에 저장이 바로안됨..

  useEffect(() => {
    initialValue();
    if (bookMark) {
      getBookData();
    } else if (like) {
      getLikeData();
    }
  }, [page, bookMark, like]);

  const onScroll = () => {
    const scrollTop = document.documentElement.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight;
    const clientHeight = document.documentElement.clientHeight;
    if (scrollTop + clientHeight >= scrollHeight) {
      setPage(page + 1);
      sessionStorage.setItem('bookMarkPage', page + 1);
    }
  };
  useEffect(() => {
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, [items]);
  return <Card postList={items} />;
}
export default Infinite;

// let getPageNum = sessionStorage.getItem('pageNum');
// getPageNum = JSON.parse(getPageNum);
// const [pageNum, setPageNum] = useState(getPageNum); //페이지 번호
// const [lastPage, setLastPage] = useState(); //마지막 페이지 확인

// //세션에 게시글 목록 저장
// let getList = sessionStorage.getItem('postList');
// getList = JSON.parse(getList);
// const [postList, setPostList] = useState(getList);

// function initValue() {
//   if (getAddressInfo == null || getAddressInfo == undefined) {
//     setAddress({ emdName: '옥인동', sggName: '종로구', sidoName: '서울특별시', emdId: 11110111 });
//     sessionStorage.setItem('addressInfo', JSON.stringify(address));
//   }
//   if (getList == null || getList == undefined) {
//     sessionStorage.setItem('postList', JSON.stringify([]));
//   }
//   if (getCategory == null || getCategory == undefined) {
//     setCategory(1);
//     sessionStorage.setItem('category', JSON.stringify(1));
//   }
//   if (getPageNum == null || getPageNum == undefined) {
//     setPageNum(0);
//     sessionStorage.setItem('pageNum', JSON.stringify(0));
//   }
// }
