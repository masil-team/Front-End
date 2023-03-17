import React, { useEffect } from 'react';
import { BASE_URL } from '../../../constants/api';
import axios from '../../../utils/token';

const MyPost = () => {
  const getPost = async () => {
    const res = await axios.get(`${BASE_URL}/my/posts`);
    console.log(res);
  };
  useEffect(() => {
    try {
      getPost();
    } catch (err) {
      console.log(err);
    }
  }, []);
  return <h1>MyPost</h1>;
};
export default MyPost;
