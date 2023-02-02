import React, { useEffect, useState } from 'react';
import styles from './style.module.css';
import PropTypes from 'prop-types';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faStreetView, faComment, faBookmark } from '@fortawesome/free-solid-svg-icons';
import { useNavigate } from 'react-router-dom';
import Modify from './Modify';
import Like from './Like';
import usePostList from '../../../hooks/usePostList';

const Index = ({ target }) => {
  const navigate = useNavigate();
  const data = usePostList(target); //게시글 목록 커스텀 훅
  const [newData, setNewData] = useState();

  console.log(newData);

  useEffect(() => {
    setNewData(data);
  }, [data]);

  return (
    <div className={styles.post_wrap}>
      {newData && (
        <ul>
          {newData &&
            newData.map(item => {
              return (
                <li key={item.id}>
                  <div className={styles.post}>
                    <div className={styles.info}>
                      <div className={styles.user_info}>
                        <div className={styles.user_img}></div>
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
                      {item.isOwner == true && <Modify item={item} data={data} setNewData={setNewData}></Modify>}
                    </div>
                    <div
                      className={styles.text_wrap}
                      onClick={() => {
                        navigate(`/post/${item.id}`);
                      }}
                    >
                      <div className={styles.img}></div>
                      <div className={styles.text}>
                        <p>{item.content}</p>
                      </div>
                    </div>
                    <div className={styles.sns}>
                      <ul>
                        <Like item={item}></Like>
                        <li>
                          <FontAwesomeIcon icon={faComment} className={styles.icon} />
                          <em>{item.commentCount}</em>
                        </li>
                        <li>
                          <FontAwesomeIcon icon={faBookmark} className={styles.icon} />
                          <em>1</em>
                        </li>
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
    </div>
  );
};

Index.propTypes = {
  target: PropTypes.object,
};

export default Index;
