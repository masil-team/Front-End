import React from 'react';
import styles from './style.module.css';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStreetView, faComment } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';

const Card = ({ postList }) => {
  const nav = useNavigate();

  return (
    <>
      <div className={styles.post_wrap}>
        {postList && (
          <ul>
            {postList &&
              postList.map(item => {
                return (
                  <li key={Math.random()}>
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
                      </div>
                      <div
                        className={styles.text_wrap}
                        onClick={() => {
                          nav(`/post/${item.id}`);
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
                          {/* <Like item={item} setData={setData}></Like> */}
                          <li>
                            <FontAwesomeIcon icon={faComment} className={styles.icon} />
                            <em>{item.commentCount}</em>
                          </li>
                          {/* <BookMark item={item}></BookMark> */}
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
        {/* {getList && getList.length == 0 && (
          <div className={styles.non_post}>
            <em>게시글이 없습니다</em>
          </div>
        )} */}
      </div>
    </>
  );
};

Card.propTypes = {
  postList: PropTypes.array,
};
export default Card;