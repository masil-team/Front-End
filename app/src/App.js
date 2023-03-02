import React from 'react';
import { Routes, Route } from 'react-router-dom';
import './reset.css';
import './App.css';
import { Main, SignUp, Post, Search } from './pages/index';
import { PATH } from './constants/path';
import Login from './pages/Login';
import CreatePost from './pages/Upload';
import MyPage from './pages/myPage';
import Profile from './pages/myPage/Profile';
import Like from './pages/myPage/Like';
import BookMark from './pages/myPage/Bookmark';
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
        <Route path={PATH.EDIT_POST} element={<CreatePost />}></Route>
        <Route path={PATH.MY_PAGE} element={<MyPage />}>
          <Route path={PATH.PROFILE} element={<Profile></Profile>}></Route>
          <Route path={PATH.LIKE} element={<Like></Like>}></Route>
          <Route path={PATH.BOOKMARK} element={<BookMark></BookMark>}></Route>
        </Route>
        <Route path={PATH.SEARCH} element={<Search />}></Route>
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
