import React from 'react';
import styles from './style.module.css';
import Nav from '../../components/Nav';
import PostImg from './PostImg';
import Comment from './Comment';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';

export const Post = () => {
  return (
    <>
      <Nav></Nav>
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
                  <em>2023년 1월 11일</em>
                </li>
              </ul>
            </div>
            <div className={styles.views}>
              <em>조회 126</em>
            </div>
          </div>
          <div className={styles.writer}>
            <div className={styles.user_info}>
              <div className={styles.img}></div>
              <em>사용자 이름</em>
            </div>
            <div className={styles.heart}>
              <FontAwesomeIcon icon={faHeart} />
            </div>
          </div>
          <PostImg></PostImg>
          <div className={styles.text}>
            <p>
              이번 오픈갤러리 작품은 유예진 작가의 “Moontan” 이에요 정신없이 반복되는 일상을 살아가는 현대인들의
              외로움속, 유토피아를 향한 갈망을 표현하고 계셨는데 보자마자 저도 모르게 이끌린거 같아요 주방이란
              현실공간에서 창문밖 환영적인 공간을 보여 주시면서 저의 공허함,쓸쓸함, 반복적인 일상을 위로받는 느낌이
              든다고 할까요 주방창문 밖으로 보이는 소복하게 쌓인눈 , 화려한조명과 집들은 12월 크리스마스를 떠올리는
              작은마을을 보는거 같아 기분이 좋아져요 겨울에 눈도 안오는 동네에 살면서 눈이 소복하게 내린 마을구경
              실컷했어요 . 국내 4만여 작품을 소개하고 있는 오픈갤러리엔 다양한 작품이 많으니 방학동안 아이들에게 원화를
              접할기회를 주는것도 좋을꺼 같아요
            </p>
          </div>
          <div className={styles.count}>
            <ul>
              <li>
                <em>조회 126</em>
              </li>
              <li>
                <em>좋아요 8</em>
              </li>
              <li>
                <em>댓글 4</em>
              </li>
            </ul>
          </div>
          <span className={styles.line}></span>
          <Comment></Comment>
        </div>
      </section>
    </>
  );
};

export default Post;
