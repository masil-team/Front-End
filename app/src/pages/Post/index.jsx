import React from 'react';
import styles from './style.module.css';
import Nav from '../../components/Nav';
import PostImg from './PostImg';
import Comment from './Comment';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { useEffect } from 'react';
import { useState } from 'react';
import useTime from '../../hooks/useTime';
import PostLike from './PostLike';
import { BASE_URL } from '../../constants/api';
import axios from '../../utils/token';
import filterArray from '../../utils/arrayFilter';
import { PATH } from '../../constants/path';
import BookMark from './BookMark';

export const Post = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [data, setData] = useState(); //게시글 데이터 저장
  const [day, setDay] = useState([]); //게시글 데이터의 날짜 저장
  const time = useTime(day); //커스텀훅 매개변수 배열로 전달 해야함
  let getList = sessionStorage.getItem('postList');
  getList = JSON.parse(getList);
  const location = useLocation();
  const [img, setImg] = useState([]); //이미지 저장
  const [imgCount, setImgCount] = useState(); //이미지 갯수 카운트

  //라우터 url이 변경될때 마다 게시글,댓글 조회 함수 실행
  useEffect(() => {
    postHandleData(); //게시글 조회
    commentHandleData(); //댓글 조회
  }, [location]);

  //게시글 단건 조회
  const postHandleData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/posts/${id}`);
      setData(res.data);
      setDay([res.data]); //날짜 저장
      setImg([res.data.files]);
      setImgCount(res.data.files.length);
      let targetItem = getList.filter(item => {
        return item.id == res.data.id;
      });
      targetItem[0].isLiked = res.data.isLiked;
      targetItem[0].likeCount = res.data.likeCount;
      const newArray = [...getList, ...targetItem];
      const filteredArr = filterArray(newArray);
      sessionStorage.setItem('postList', JSON.stringify(filteredArr));
    } catch (error) {
      console.log(error);
    }
  };

  //게시글 삭제 요청
  const onPostDelete = async () => {
    try {
      await axios.delete(`${BASE_URL}/posts/${data.id}`);
      sessionStorage.removeItem('postList');
      sessionStorage.removeItem('pageNum');
      navigate(PATH.MAIN);
    } catch (error) {
      console.log(error);
    }
  };

  //게시글 수정 버튼 클릭시 실행 함수
  const handlePostModify = () => {
    sessionStorage.setItem('postModify', JSON.stringify(data)); //sessionStorage에 수정할 게시물 값 저장
    navigate(PATH.EDIT_POST);
  };

  //해당 게시글 댓글 조회
  const [commentData, setCommentData] = useState(); //댓글 데이터 저장
  const [newComment, setNewComment] = useState(); //댓글 데이터 저장
  const [commentPage, setCommentPage] = useState([]); //댓글 페이지 저장
  const [totalPage, setTotalPage] = useState(); //댓글 총 페이지 수 저장
  const [currentPage, setCurrentPage] = useState(0); //현재 활성화된 페이지 번호 저장
  const [commentCount, setCommentCount] = useState(); //댓글 총 갯수 저장

  //댓글 페이지 조회
  const commentHandleData = async () => {
    try {
      const res = await axios.get(`${BASE_URL}/posts/${id}/comments?page=${currentPage}`);
      setCommentData(res.data.comments);
      handleTimeFilter(res.data.comments);
      setTotalPage(res.data.totalPage); //토탈페이지 수가 들어가면 됨
      pagiNation(res.data.totalPage); //토탈페이지 수가 들어가면 됨
      setCommentCount(res.data.totalCommentCount);
      let targetItem = await getList.filter(item => {
        return item.id == id;
      });
      targetItem[0].commentCount = res.data.totalCommentCount;
      const newArray = [...getList, ...targetItem];
      const filteredArr = filterArray(newArray);
      sessionStorage.setItem('postList', JSON.stringify(filteredArr));
    } catch (error) {
      console.log(error);
    }
  };

  //현재 활성화된 페이지 번호가 변경 될 때 댓글 페이지 조회 함수 실행
  useEffect(() => {
    commentHandleData();
  }, [currentPage]);

  //댓글 페이지네이션
  function pagiNation(totalPage) {
    let pageArray = [];
    for (let i = 1; i <= totalPage; i++) {
      pageArray.push(i);
    }
    setCommentPage(pageArray);
  }

  // 댓글 날짜 포맷팅
  const [day2, setDay2] = useState([]); //데이터의 날짜 저장
  const time2 = useTime(day2); //커스텀훅 매개변수 배열로 전달 해야함

  const handleTimeFilter = data => {
    setDay2([...day2, ...data]);
  };

  /* time이 변경될때 마다 실행  */
  useEffect(() => {
    if (commentData) {
      const dataCopy = [...commentData];
      const filteredArr = filterArray(dataCopy);
      const newArray = filteredArr.filter((item, index) => {
        const newItem = (item.newTime = time2[index]);
        return newItem;
      });
      setNewComment(newArray);
    }
  }, [time2]);

  useEffect(() => {
    postHandleData();
    commentHandleData();
  }, []);

  return (
    <>
      <Nav></Nav>
      {data && (
        <section className={styles.section}>
          <div className={styles.container}>
            <div className={styles.top_info}>
              <div className={styles.address}>
                <ul>
                  <li>
                    <em>동네소식</em>
                  </li>
                  <li>
                    <em>북구</em>
                  </li>
                  <li>
                    <em>{time && time}</em>
                  </li>
                </ul>
              </div>
              <div className={styles.views}>
                <em>조회 {data.viewCount}</em>
              </div>
            </div>
            <div className={styles.writer}>
              <div className={styles.user_info}>
                <div className={styles.img}>
                  <img src={`${process.env.PUBLIC_URL}/images/test/user.jpg`} alt="" />
                </div>
                <em>{data.member.nickname}</em>
              </div>
              <div className={styles.post_icon}>
                <ul>
                  <li>{data.isOwner == false && <PostLike data={data} postHandleData={postHandleData}></PostLike>}</li>
                  {data.isOwner == false && <BookMark item={data}></BookMark>}
                </ul>
              </div>
              {data.isOwner == true && (
                <div className={styles.post_modify}>
                  <ul>
                    <li>
                      <em
                        onClick={() => {
                          handlePostModify();
                        }}
                      >
                        수정
                      </em>
                    </li>
                    <li>
                      <em
                        onClick={() => {
                          onPostDelete();
                        }}
                      >
                        삭제
                      </em>
                    </li>
                  </ul>
                </div>
              )}
            </div>
            <PostImg img={img} imgCount={imgCount}></PostImg>
            <div className={styles.text}>
              <p>{data.content}</p>
            </div>
            <div className={styles.count}>
              <ul>
                <li>
                  <em>조회 {data.viewCount}</em>
                </li>
                <li>
                  <em>좋아요 {data.likeCount}</em>
                </li>
                <li>
                  <em>댓글 {commentCount}</em>
                </li>
              </ul>
            </div>
            <span className={styles.line}></span>
            <Comment
              newComment={newComment}
              id={id}
              commentHandleData={commentHandleData}
              commentPage={commentPage}
              totalPage={totalPage}
              currentPage={currentPage}
              setCurrentPage={setCurrentPage}
            ></Comment>
          </div>
        </section>
      )}
    </>
  );
};

export default Post;
