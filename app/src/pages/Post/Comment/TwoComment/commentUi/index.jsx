import React, { useState } from 'react';
import styles from '../../style.module.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart } from '@fortawesome/free-solid-svg-icons';
import useTime from '../../../../../hooks/useTime';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../../../../constants/path';

const Index = ({
  item,
  target,
  handleCommentRemove,
  setCommentPutTarget,
  setTabTwoComment,
  setCommentPut2,
  setCommentValue2,
  handleCommentLike,
}) => {
  // 댓글 날짜 포맷팅
  const [day] = useState([target]); //데이터의 날짜 저장
  const time = useTime(day); //커스텀훅 매개변수 배열로 전달 해야함
  const navigate = useNavigate();

  //로그인 여부 체크
  let user = sessionStorage.getItem('user');
  user = JSON.parse(user);

  return (
    <li>
      <div className={styles.two_depth_comment}>
        <div className={styles.two_depth_comment_wrap}>
          <div className={styles.user_img}></div>
          <div className={styles.comment}>
            <h4>{target.member.nickname}</h4>
            <p>{target.content}</p>
            <div className={styles.comment_info}>
              <ul
                onClick={() => {
                  if (user == null || undefined) {
                    user == null && navigate(PATH.LOGIN);
                    return;
                  }
                }}
              >
                <li>
                  <em>{time}</em>
                </li>
                {target.isOwner == false && (
                  <li
                    onClick={() => {
                      handleCommentLike(target.id);
                    }}
                    className={`${target.isLiked == true && styles.active}`}
                  >
                    <FontAwesomeIcon icon={faHeart} className={styles.icon} />
                    <em>좋아요</em>
                  </li>
                )}
                {target.isOwner == false && (
                  <li>
                    <em>신고</em>
                  </li>
                )}
                {target.isOwner == true && (
                  <li
                    onClick={() => {
                      setCommentPutTarget(target.id);
                      setTabTwoComment(item.id);
                      setCommentPut2(1);
                      setCommentValue2(target.content);
                    }}
                  >
                    <em>수정</em>
                  </li>
                )}
                {target.isOwner == true && (
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
  setCommentPut2: PropTypes.func,
  setCommentValue2: PropTypes.func,
  handleCommentLike: PropTypes.func,
};

export default Index;
