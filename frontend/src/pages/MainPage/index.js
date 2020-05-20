import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { getMainpageData, clearPosts } from '../../reducers/post';

function MainPage(props) {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(getMainpageData());
    return () => {
      dispatch(clearPosts());
    };
  }, [dispatch]);
  return (
    <div>
      <h1>TECHBLOG.ZIP 메인페이지</h1>
    </div>
  );
}

export default MainPage;
