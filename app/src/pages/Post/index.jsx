import React from 'react';
import styles from './style.module.css';
import Nav from '../../components/Nav';
import PostImg from './PostImg';
import Comment from './Comment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useParams } from 'react-router-dom';
import Axios from 'axios';
import { useEffect } from 'react';
import { useState } from 'react';
import useTime from '../../hooks/useTime';

export const Post = () => {
  const { id } = useParams();
  const [data, setData] = useState(); //게시글 데이터 저장
  const [day, setDay] = useState([]); //게시글 데이터의 날짜 저장
  const time = useTime(day); //커스텀훅 매개변수 배열로 전달 해야함

  //게시글 단건 조회
  const postHandleData = async () => {
    try {
      const res = await Axios.get(`http://13.209.94.72:8080/posts/${id}`);
      setData(res.data);
      setDay([res.data.createDate]); //날짜 저장
    } catch (error) {
      console.log(error);
    }
  };

  //해당 게시글 댓글 조회
  const [commentData, setCommentData] = useState(); //댓글 데이터 저장
  const commentHandleData = async () => {
    try {
      const res = await Axios.get(`http://13.209.94.72:8080/posts/${id}/comments`);
      setCommentData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

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
                <div className={styles.img}></div>
                <em>{data.member.nickname}</em>
              </div>
              <div className={styles.heart}>
                <FontAwesomeIcon icon={faHeart} />
              </div>
            </div>
            <PostImg></PostImg>
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
                  <em>댓글 4</em>
                </li>
              </ul>
            </div>
            <span className={styles.line}></span>
            <Comment commentData={commentData}></Comment>
          </div>
        </section>
      )}
    </>
  );
};

export default Post;
