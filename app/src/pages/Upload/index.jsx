import Nav from '../../components/Nav';
import React from 'react';
import styles from './style.module.css';
import GridItem from './item/GridItem';
import Form from './Form';
import { useState } from 'react';

const CreatePost = () => {
  const [image, setImage] = useState([]);
  const [count, setCount] = useState(0);

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
