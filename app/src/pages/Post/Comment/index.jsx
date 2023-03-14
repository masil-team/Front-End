import React from 'react';
import styles from './style.module.css';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faHeart, faCamera } from '@fortawesome/free-solid-svg-icons';
import { useState } from 'react';
import { BASE_URL } from '../../../constants/api';
import axios from '../../../utils/token';
import TwoComment from './TwoComment';
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { PATH } from '../../../constants/path';
import userCheck from '../../../utils/userCheck';

const Index = ({ newComment, id, commentHandleData, commentPage, totalPage, currentPage, setCurrentPage }) => {
  const navigate = useNavigate();
  const [tabTwoComment, setTabTwoComment] = useState(); //대댓글이 몇번째 댓글에 달려야 하는지 위치 지정
  const [commentValue, setCommentValue] = useState(); //input 입력값 저장
  const [commentPut, setCommentPut] = useState(0); //댓글 생성,댓글 수정 확인
  const [commentPutTarget, setCommentPutTarget] = useState(); //댓글 수정 ID 담기
  const [commentValue2, setCommentValue2] = useState(); //대댓글 input 입력값 저장
  const [commentPut2, setCommentPut2] = useState(0); //대댓글 생성,댓글 수정 확인

  const [currentPageGroup, setCurrentPageGroup] = useState(0); //현재 페이지 그룹
  const [page, setPage] = useState(); //현재 페이지 그룹의 페이지 번호 저장

  //로그인 여부 체크
  const user = userCheck();

  const [, setFileData] = useState(); //이미지 저장
  /* 이미지 업로드 */
  const onChangeImg = e => {
    const uploadFile = e.target.files[0];
    const formData = new FormData();
    formData.append('image', uploadFile);

    axios
      .post(`${BASE_URL}`, formData)
      .then(res => {
        setFileData(prev => [...prev, ...res.data]);
      })
      .catch(error => {
        console.log('이미지 업로드실패', error);
      });
  };

  //변경된 페이지 그룹으로 페이지 번호가 변경됨
  function changePage() {
    let commentPageCopy = [...commentPage];
    commentPageCopy = commentPageCopy.slice(currentPageGroup * 5, (currentPageGroup + 1) * 5);
    setPage(commentPageCopy);
  }

  //이전 , 다음 클릭시 페이지 그룹이 변경 되고 아래 changePage 함수 호출됨
  useEffect(() => {
    changePage();
  }, [currentPageGroup]);

  //페이지 번호가 있다면 첫화면에 0,5 페이지를 보여줌
  useEffect(() => {
    let commentPageCopy = [...commentPage];
    commentPageCopy = commentPageCopy.slice(0, 5);
    setPage(commentPageCopy);
  }, [totalPage]);

  //댓글 입력
  const handleComment = async () => {
    try {
      if (commentPut == 0) {
        await axios.post(`${BASE_URL}/posts/${id}/comments`, { content: commentValue });
      } else {
        await axios.patch(`${BASE_URL}/posts/${id}/comments/${commentPutTarget}`, { content: commentValue });
        setCommentPut(0);
      }

      setCommentValue('');
      commentHandleData();
    } catch (error) {
      console.log(error);
    }
  };

  //댓글 삭제
  const handleCommentRemove = async commentId => {
    try {
      await axios.delete(`${BASE_URL}/posts/${id}/comments/${commentId}`);
      commentHandleData();
    } catch (error) {
      console.log(error);
    }
  };

  //댓글 좋아요
  const handleCommentLike = async commentId => {
    try {
      await axios.put(`${BASE_URL}/comments/${commentId}/addLike`);
      commentHandleData();
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className={styles.comment_wrap}>
      {user && (
        <form
          className={styles.my_form}
          onSubmit={e => {
            e.preventDefault();
            handleComment();
          }}
        >
          <div className={styles.comment_input}>
            <div className={styles.input_box}>
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
            <div className={styles.input_put}>
              <div className={styles.img_add}>
                <input
                  className={styles.file_input}
                  type="file"
                  id="img_upload"
                  accept="image/*"
                  onChange={e => {
                    onChangeImg(e);
                  }}
                />
                <label className={styles.img_upload_label} htmlFor="img_upload">
                  <FontAwesomeIcon icon={faCamera} /> 사진 올리기
                </label>
              </div>
              {commentPut == 1 && (
                <div className={styles.cancel}>
                  <em
                    onClick={() => {
                      setCommentPut(0);
                      setCommentValue('');
                    }}
                  >
                    수정 취소
                  </em>
                </div>
              )}
            </div>
          </div>
        </form>
      )}
      <div className={styles.comment_list}>
        {newComment && (
          <ul>
            {newComment.map(item => {
              return (
                <li key={item.id}>
                  <div className={styles.one_depth_comment}>
                    <div className={styles.user_img}></div>
                    <div className={styles.comment}>
                      <h4>{item.member.nickname}</h4>
                      {item.isDeleted == false ? <p>{item.content} </p> : <p>삭제된 댓글 입니다.</p>}
                      {item.isDeleted == false && (
                        <div className={styles.comment_info}>
                          <ul
                            onClick={() => {
                              if (user == false) {
                                navigate(PATH.LOGIN);
                                return;
                              }
                            }}
                          >
                            <li>
                              <em>{item.newTime}</em>
                            </li>
                            <li
                              onClick={() => {
                                setTabTwoComment(item.id);
                                setCommentValue('');
                                setCommentValue2('');
                                setCommentPut2(0);
                              }}
                            >
                              <em>답글 달기</em>
                            </li>
                            {item.isOwner == false && (
                              <li
                                onClick={() => {
                                  handleCommentLike(item.id);
                                }}
                                className={`${item.isLiked == true && styles.active}`}
                              >
                                <FontAwesomeIcon icon={faHeart} className={styles.icon} />
                                <em>좋아요</em>
                              </li>
                            )}
                            {item.isOwner == false && (
                              <li>
                                <em>신고</em>
                              </li>
                            )}
                            {item.isOwner == true && (
                              <li
                                onClick={() => {
                                  setCommentPut(1);
                                  setCommentValue(item.content);
                                  setCommentPutTarget(item.id);
                                  setTabTwoComment(-1);
                                }}
                              >
                                <em>수정</em>
                              </li>
                            )}
                            {item.isOwner == true && (
                              <li
                                onClick={() => {
                                  handleCommentRemove(item.id);
                                }}
                              >
                                <em>삭제</em>
                              </li>
                            )}
                          </ul>
                        </div>
                      )}
                    </div>
                  </div>
                  <TwoComment
                    item={item}
                    commentHandleData={commentHandleData}
                    id={id}
                    tabTwoComment={tabTwoComment}
                    setTabTwoComment={setTabTwoComment}
                    handleCommentRemove={handleCommentRemove}
                    handleCommentLike={handleCommentLike}
                    commentValue2={commentValue2}
                    setCommentValue2={setCommentValue2}
                    commentPut2={commentPut2}
                    setCommentPut2={setCommentPut2}
                  ></TwoComment>
                </li>
              );
            })}
          </ul>
        )}
        {totalPage != 0 && (
          <div className={styles.page_number}>
            <ul>
              <li
                onClick={() => {
                  setCurrentPageGroup(prev => prev - 1);
                }}
                className={`${currentPageGroup == 0 && styles.visible}`}
              >
                <em>이전</em>
              </li>
              {page &&
                page.map((item, index) => {
                  return (
                    <li
                      key={index}
                      onClick={() => {
                        setCurrentPage(item - 1);
                      }}
                      className={`${currentPage == item - 1 && styles.active}`}
                    >
                      <em>{item}</em>
                    </li>
                  );
                })}
              <li
                onClick={() => {
                  setCurrentPageGroup(prev => prev + 1);
                }}
                className={`${Math.ceil(totalPage / 5) == currentPageGroup + 1 && styles.visible}`}
              >
                <em>다음</em>
              </li>
            </ul>
          </div>
        )}
      </div>
    </div>
  );
};

Index.propTypes = {
  newComment: PropTypes.array,
  id: PropTypes.string,
  commentHandleData: PropTypes.func,
  commentPage: PropTypes.array,
  totalPage: PropTypes.number,
  currentPage: PropTypes.number,
  setCurrentPage: PropTypes.func,
};

export default Index;
