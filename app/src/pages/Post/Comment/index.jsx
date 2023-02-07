import React from 'react';
import styles from './style.module.css';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { BASE_URL } from '../../../constants/api';
import axios from '../../../utils/token';

const Index = ({ commentData, id, commentHandleData }) => {
  const [twoComment, setTwoComment] = useState(); //대댓글이 몇번째 댓글에 달려야 하는지 위치 지정
  const [commentValue, setCommentValue] = useState(); //input 입력값 저장
  console.log('댓글 조회', commentData);

  const handleComment = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/posts/${id}/comments`, { content: commentValue });
      console.log('댓글 입력 성공', res);
      commentHandleData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.comment_wrap}>
      <form
        className={styles.my_form}
        onSubmit={e => {
          e.preventDefault();
          handleComment();
        }}
      >
        <div className={styles.comment_input}>
          <div className={styles.user_img}></div>
          <input
            type="text"
            placeholder="칭찬과 격려의 댓글은 작성자에게 큰 힘이 됩니다 :)"
            onChange={e => {
              setCommentValue(e.target.value);
            }}
          />
          <button className={styles.btn}>입력</button>
        </div>
      </form>
      <div className={styles.comment_list}>
        <ul>
          <li>
            <div className={styles.one_depth_comment}>
              <div className={styles.user_img}></div>
              <div className={styles.comment}>
                <h4>사용자 이름</h4>
                <p>칭찬과 격려의 댓글은 작성자에게 큰 힘이 됩니다. </p>
                <div className={styles.comment_info}>
                  <ul>
                    <li>
                      <em>2023년 1월 9일</em>
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faHeart} className={styles.icon} />
                      <em>좋아요</em>
                    </li>
                    <li
                      onClick={() => {
                        setTwoComment(0);
                      }}
                    >
                      <em>답글 달기</em>
                    </li>
                    <li>
                      <em>신고</em>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className={styles.two_depth_comment}>
              <div className={styles.two_depth_comment_wrap}>
                <div className={styles.user_img}></div>
                <div className={styles.comment}>
                  <h4>사용자 이름</h4>
                  <p>칭찬과 격려의 댓글은 작성자에게 큰 힘이 됩니다. </p>
                  <div className={styles.comment_info}>
                    <ul>
                      <li>
                        <em>2023년 1월 9일</em>
                      </li>
                      <li>
                        <FontAwesomeIcon icon={faHeart} className={styles.icon} />
                        <em>좋아요</em>
                      </li>
                      <li>
                        <em>신고</em>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {twoComment == 0 && (
                <div className={styles.comment_input}>
                  <div className={styles.user_img}></div>
                  <input type="text" placeholder="칭찬과 격려의 댓글은 작성자에게 큰 힘이 됩니다 :)" />
                  <button className={styles.btn}>입력</button>
                </div>
              )}
            </div>
          </li>
          <li>
            <div className={styles.one_depth_comment}>
              <div className={styles.user_img}></div>
              <div className={styles.comment}>
                <h4>사용자 이름</h4>
                <p>칭찬과 격려의 댓글은 작성자에게 큰 힘이 됩니다. </p>
                <div className={styles.comment_info}>
                  <ul>
                    <li>
                      <em>2023년 1월 9일</em>
                    </li>
                    <li>
                      <FontAwesomeIcon icon={faHeart} className={styles.icon} />
                      <em>좋아요</em>
                    </li>
                    <li
                      onClick={() => {
                        setTwoComment(1);
                      }}
                    >
                      <em>답글 달기</em>
                    </li>
                    <li>
                      <em>신고</em>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
            <div className={styles.two_depth_comment}>
              <div className={styles.two_depth_comment_wrap}>
                <div className={styles.user_img}></div>
                <div className={styles.comment}>
                  <h4>사용자 이름</h4>
                  <p>칭찬과 격려의 댓글은 작성자에게 큰 힘이 됩니다. </p>
                  <div className={styles.comment_info}>
                    <ul>
                      <li>
                        <em>2023년 1월 9일</em>
                      </li>
                      <li>
                        <FontAwesomeIcon icon={faHeart} className={styles.icon} />
                        <em>좋아요</em>
                      </li>
                      <li>
                        <em>신고</em>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
              {twoComment == 1 && (
                <div className={styles.comment_input}>
                  <div className={styles.user_img}></div>
                  <input type="text" placeholder="칭찬과 격려의 댓글은 작성자에게 큰 힘이 됩니다 :)" />
                  <button className={styles.btn}>입력</button>
                </div>
              )}
            </div>
          </li>
        </ul>
      </div>
    </div>
  );
};

Index.propTypes = {
  commentData: PropTypes.array,
  id: PropTypes.num,
  commentHandleData: PropTypes.func,
};

export default Index;
