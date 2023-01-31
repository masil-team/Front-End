import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './reset.css';
import './App.css';
import { Main, SignUp, Post } from './pages/index';
import { PATH } from './constants/path';
import Login from './pages/Login';
import CreatePost from './pages/Upload';

/* prop 타입체크 */
// import PropTypes from 'prop-types';

/* 폰트어썸 */
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBars } from '@fortawesome/free-solid-svg-icons';

/* 이미지 절대경로 */
// src={`${process.env.PUBLIC_URL}/나머지 폴더 주소`}

function App() {
  return (
    <div className="App">
      <Routes>
        <Route path={PATH.MAIN} element={<Main></Main>}></Route>
        <Route path={PATH.SIGNUP} element={<SignUp></SignUp>}></Route>
        <Route path={PATH.LOGIN} element={<Login />}></Route>
        <Route path={PATH.POST} element={<Post></Post>}></Route>
        <Route path={PATH.CREATE_POST} element={<CreatePost />}></Route>
      </Routes>
    </div>
  );
}

/*
Index.propTypes = {
  prop이름: PropTypes.array,
};
*/
export default App;
