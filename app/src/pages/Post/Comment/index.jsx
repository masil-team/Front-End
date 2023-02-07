import React from 'react';
import styles from './style.module.css';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { BASE_URL } from '../../../constants/api';
import axios from '../../../utils/token';
import TwoComment from './TwoComment';

const Index = ({ commentData, id, commentHandleData }) => {
  const [twoComment, setTwoComment] = useState(); //대댓글이 몇번째 댓글에 달려야 하는지 위치 지정
  const [commentValue, setCommentValue] = useState(); //input 입력값 저장
  const [commentValue2, setCommentValue2] = useState(); //대댓글 input 입력값 저장

  //댓글 입력
  const handleComment = async () => {
    try {
      const res = await axios.post(`${BASE_URL}/posts/${id}/comments`, { content: commentValue });
      console.log('댓글 입력 성공', res);
      setCommentValue('');
      commentHandleData();
    } catch (error) {
      console.log(error);
    }
  };

  const handleComment2 = async commentId => {
    try {
      const res = await axios.post(`${BASE_URL}/posts/${id}/reply/${commentId}`, { content: commentValue2 });
      console.log('대댓글 입력 성공', res);
      setCommentValue2('');
      commentHandleData();
      setTwoComment(-1);
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
            value={commentValue || ''}
            onChange={e => {
              setCommentValue(e.target.value);
            }}
          />
          <button className={styles.btn}>입력</button>
        </div>
      </form>
      <div className={styles.comment_list}>
        {commentData && (
          <ul>
            {commentData.map(item => {
              return (
                <li key={item.id}>
                  <div className={styles.one_depth_comment}>
                    <div className={styles.user_img}></div>
                    <div className={styles.comment}>
                      <h4>{item.member.nickname}</h4>
                      <p>{item.content} </p>
                      <div className={styles.comment_info}>
                        <ul>
                          <li>
                            <em>{item.newTime}</em>
                          </li>
                          <li>
                            <FontAwesomeIcon icon={faHeart} className={styles.icon} />
                            <em>좋아요</em>
                          </li>
                          <li
                            onClick={() => {
                              setTwoComment(item.id);
                              setCommentValue('');
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
                  <div className={styles.two_comment}>
                    <ul>
                      {item.replies.map(item2 => {
                        return <TwoComment key={item2.id} item2={item2}></TwoComment>;
                      })}
                    </ul>
                    {twoComment == item.id && (
                      <form
                        onSubmit={e => {
                          e.preventDefault();
                          handleComment2(item.id);
                        }}
                      >
                        <div className={styles.comment_input}>
                          <div className={styles.user_img}></div>
                          <input
                            type="text"
                            placeholder="칭찬과 격려의 댓글은 작성자에게 큰 힘이 됩니다 :)"
                            onChange={e => {
                              setCommentValue2(e.target.value);
                            }}
                          />
                          <button className={styles.btn}>입력</button>
                        </div>
                      </form>
                    )}
                  </div>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
};

Index.propTypes = {
  commentData: PropTypes.array,
  id: PropTypes.string,
  commentHandleData: PropTypes.func,
};

export default Index;
