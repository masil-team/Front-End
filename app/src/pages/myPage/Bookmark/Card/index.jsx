import React from 'react';
import styles from './style.module.css';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStreetView, faComment } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Modify from '../Modify';
import BookMarkCheck from '../BookMarkCheck';
import LikeCheck from '../LikeCheck';
const Card = ({ data, postList, setPostList, setData, setNewData }) => {
  const navigate = useNavigate();
  // const postList = JSON.parse(sessionStorage.getItem('bookMarkList'));

  return (
    <>
      <div className={styles.post_wrap}>
        {postList && (
          <ul>
            {postList &&
              postList.map(item => {
                return (
                  <li key={item.id}>
                    <div className={styles.post}>
                      <div className={styles.info}>
                        <div className={styles.user_info}>
                          <div className={styles.user_img}>
                            <img src={`${process.env.PUBLIC_URL}/images/test/user.jpg`} alt="" />
                          </div>
                          <div className={styles.user}>
                            <div className={styles.user_name}>
                              <h4>{item.member.nickname}</h4>
                            </div>
                            <div className={styles.user_address}>
                              <ul>
                                <li>
                                  <FontAwesomeIcon icon={faStreetView} />
                                  <em>북구</em>
                                </li>
                                <li>
                                  <em>{item.newTime}</em>
                                </li>
                              </ul>
                            </div>
                          </div>
                        </div>
                        {item.isOwner == true && (
                          <Modify item={item} data={data} setData={setData} setNewData={setNewData}></Modify>
                        )}
                      </div>
                      <div
                        className={styles.text_wrap}
                        onClick={() => {
                          navigate(`/post/${item.id}`);
                        }}
                      >
                        <div className={styles.img}>
                          <img src={`${process.env.PUBLIC_URL}/images/test/background.jpg`} alt="" />
                        </div>
                        <div className={styles.text}>
                          <p>{item.content}</p>
                        </div>
                      </div>
                      <div className={styles.sns}>
                        <ul>
                          <LikeCheck item={item} setData={setData}></LikeCheck>
                          <li>
                            <FontAwesomeIcon icon={faComment} className={styles.icon} />
                            <em>{item.commentCount}</em>
                          </li>
                          <BookMarkCheck
                            setData={setData}
                            setNewData={setNewData}
                            postList={postList}
                            setPostList={setPostList}
                            item={item}
                          ></BookMarkCheck>
                        </ul>
                      </div>
                      <div className={styles.category}>
                        <ul>
                          <li>
                            <em>동네소식</em>
                          </li>
                        </ul>
                      </div>
                    </div>
                  </li>
                );
              })}
          </ul>
        )}
        {postList && postList.length == 0 && (
          <div className={styles.non_post}>
            <em>게시글이 없습니다</em>
          </div>
        )}
      </div>
    </>
  );
};

Card.propTypes = {
  data: PropTypes.array,
  newData: PropTypes.array,
  postList: PropTypes.array,
  setPostList: PropTypes.func,
  setData: PropTypes.func,
  setNewData: PropTypes.func,
};
export default Card;
