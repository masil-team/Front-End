import React, { useState } from 'react';
import PropTypes from 'prop-types';
import styles from '../style.module.css';
import axios from '../../../../utils/token';
import { BASE_URL } from '../../../../constants/api';
import CommentUI from './commentUi';

const Index = ({
  item,
  commentHandleData,
  id,
  tabTwoComment,
  setTabTwoComment,
  handleCommentRemove,
  handleCommentLike,
  commentValue2,
  setCommentValue2,
  commentPut2,
  setCommentPut2,
}) => {
  const [commentPutTarget, setCommentPutTarget] = useState(); //댓글 수정 ID 담기

  //대댓글 입력
  const handleComment2 = async commentId => {
    try {
      if (commentPut2 == 0) {
        await axios.post(`${BASE_URL}/posts/${id}/reply/${commentId}`, { content: commentValue2 });
      } else {
        await axios.patch(`${BASE_URL}/posts/${id}/comments/${commentPutTarget}`, { content: commentValue2 });
        setCommentPut2(0);
      }
      setCommentValue2('');
      commentHandleData();
      setTabTwoComment(-1);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.two_comment}>
      <ul>
        {item.replies.map(target => {
          return (
            <CommentUI
              key={target.id}
              item={item}
              target={target}
              handleCommentRemove={handleCommentRemove}
              setCommentPut2={setCommentPut2}
              setCommentPutTarget={setCommentPutTarget}
              setTabTwoComment={setTabTwoComment}
              setCommentValue2={setCommentValue2}
              handleCommentLike={handleCommentLike}
            ></CommentUI>
          );
        })}
      </ul>
      {tabTwoComment == item.id && (
        <form
          onSubmit={e => {
            e.preventDefault();
            handleComment2(item.id);
          }}
        >
          <div className={styles.comment_input}>
            <div className={styles.input_box}>
              <div className={styles.user_img}></div>
              <input
                type="text"
                placeholder="칭찬과 격려의 댓글은 작성자에게 큰 힘이 됩니다 :)"
                value={commentValue2 || ''}
                onChange={e => {
                  setCommentValue2(e.target.value);
                }}
              />
              <button className={styles.btn}>입력</button>
            </div>
            {commentPut2 == 1 && (
              <div className={styles.cancel}>
                <em
                  onClick={() => {
                    setCommentPut2(0);
                    setCommentValue2('');
                    setTabTwoComment(-1);
                  }}
                >
                  수정 취소
                </em>
              </div>
            )}
          </div>
        </form>
      )}
    </div>
  );
};

Index.propTypes = {
  item: PropTypes.object,
  commentHandleData: PropTypes.func,
  id: PropTypes.string,
  tabTwoComment: PropTypes.number,
  setTabTwoComment: PropTypes.func,
  handleCommentRemove: PropTypes.func,
  handleCommentLike: PropTypes.func,
  commentValue2: PropTypes.string,
  setCommentValue2: PropTypes.func,
  commentPut2: PropTypes.number,
  setCommentPut2: PropTypes.func,
};

export default Index;
