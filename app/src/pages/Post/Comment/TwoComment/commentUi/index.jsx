import React, { useState } from 'react';
import styles from '../../style.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import useTime from '../../../../../hooks/useTime';
import PropTypes from 'prop-types';

const Index = ({
  item,
  target,
  handleCommentRemove,
  setCommentPutTarget,
  setTabTwoComment,
  setCommentPut,
  setCommentValue2,
  handleCommentLike,
}) => {
  // 댓글 날짜 포맷팅
  const [day] = useState([target]); //데이터의 날짜 저장
  const time = useTime(day); //커스텀훅 매개변수 배열로 전달 해야함

  return (
    <li>
      <div className={styles.two_depth_comment}>
        <div className={styles.two_depth_comment_wrap}>
          <div className={styles.user_img}></div>
          <div className={styles.comment}>
            <h4>{target.member.nickname}</h4>
            <p>{target.content}</p>
            <div className={styles.comment_info}>
              <ul>
                <li>
                  <em>{time}</em>
                </li>
                {target.owner == false && (
                  <li
                    onClick={() => {
                      handleCommentLike(target.id);
                    }}
                    className={`${target.liked == true && styles.active}`}
                  >
                    <FontAwesomeIcon icon={faHeart} className={styles.icon} />
                    <em>좋아요</em>
                  </li>
                )}
                {target.owner == false && (
                  <li>
                    <em>신고</em>
                  </li>
                )}
                {target.owner == true && (
                  <li
                    onClick={() => {
                      setCommentPutTarget(target.id);
                      setTabTwoComment(item.id);
                      setCommentPut(1);
                      setCommentValue2(target.content);
                    }}
                  >
                    <em>수정</em>
                  </li>
                )}
                {target.owner == true && (
                  <li
                    onClick={() => {
                      handleCommentRemove(target.id);
                    }}
                  >
                    <em>삭제</em>
                  </li>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </li>
  );
};

Index.propTypes = {
  item: PropTypes.object,
  target: PropTypes.object,
  handleCommentRemove: PropTypes.func,
  setCommentPutTarget: PropTypes.func,
  setTabTwoComment: PropTypes.func,
  setCommentPut: PropTypes.func,
  setCommentValue2: PropTypes.func,
  handleCommentLike: PropTypes.func,
};

export default Index;
