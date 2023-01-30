import Nav from '../../components/Nav';
import React from 'react';
import styles from './style.module.css';
import GridItem from './item/GridItem';
import Form from './Form';
import { useState } from 'react';
import { useEffect } from 'react';
import axios from 'axios';
const CreatePost = () => {
  const [image, setImage] = useState([]);
  const [count, setCount] = useState(0);
  let token =
    'eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJ0ZXN0MTIzQG5hdmVyLmNvbSIsImF1dGgiOiJST0xFX1VTRVIiLCJpYXQiOjE2NzUwNTkzMzUsImV4cCI6MTY3NTE0NTczNX0.uA2YcSMyqKxczaaaUwgUoQ7M3fPLAt_pYaeRx-p3uMT1n6M69Cs7SPC9DygLzacJP00l_t5co5WCtpXoqlnZ0g';
  useEffect(() => {
    axios.post(
      'http://13.209.94.72:8080/boards/1/posts',
      { content: 'hello' },
      {
        headers: { Authorization: `Bearer ${token}` },
      },
    );
  }, []);
  return (
    <>
      <Nav />
      <div className={styles.container}>
        <div className={styles.innerContainer}>
          <Form image={image} setImage={setImage} count={count} setCount={setCount} />
          <div className={styles.thirdsection}>
            <GridItem image={image} setImage={setImage} count={count} setCount={setCount} />
          </div>
        </div>
      </div>
    </>
  );
};

export default CreatePost;
