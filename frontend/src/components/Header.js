import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../reducers/user';
import cs from 'classnames';
import _ from 'lodash';
import Logo from './Logo';

const HeaderWrapper = styled.header`
  width: 100%;
  background-color: transparent;
  position: fixed;
  top: 0;
  z-index: 3;
  transition: background 0.3s;
  ul {
    display: flex;
    list-style: none;
    margin: 0;
    padding: 1.3rem 1.3rem;
  }

  li + li {
    margin-left: 1rem;
  }

  &.headerScroll {
    background: #00020b;
    a {
      color: white;
    }
  }
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

function Header({ history }) {
  console.log();
  const header = useRef(null);
  const [headerScroll, setheaderScroll] = useState(false);
  const [logoReverse, setLogoReverse] = useState(false);

  // URL 위치 따라 바디에 네비게이션 높이만큼 패딩주기.
  useEffect(() => {
    if (history.location.pathname === '/') {
      document.body.style.paddingTop = 0;
    } else {
      const { offsetTop, clientHeight } = header.current;
      document.body.style.paddingTop = `${offsetTop * 2 + clientHeight}px`;
    }
  }, [history.location.pathname]);

  // 스크롤 이벤트 달아주기.
  useEffect(() => {
    window.addEventListener('scroll', () => {
      const scrollTop =
        document.body.scrollTop || document.documentElement.scrollTop;
      if (scrollTop === 0) {
        setheaderScroll(false);
        setLogoReverse(false);
      } else {
        setheaderScroll(true);
        setLogoReverse(true);
      }
    });
  }, []);

  const dispatch = useDispatch();
  const { isLoggedIn, user } = useSelector(({ user }) => ({
    isLoggedIn: user.isLoggedIn,
    user: user.currentUser,
  }));

  const onLogout = () => {
    dispatch(logout());
    history.push('/');
  };

  return (
    <HeaderWrapper className={cs({ headerScroll })}>
      <ul ref={header}>
        <li>
          <NavLink to="/">
            <Logo size="1rem" reverse={logoReverse} />
          </NavLink>
        </li>
        <li>
          <NavLink to="/posts">최신글들</NavLink>
        </li>
        <li>
          <NavLink to="/trend">트렌드페이지</NavLink>
        </li>
        <li>
          <NavLink to="/search/검색결과">검색결과페이지</NavLink>
        </li>
        {!isLoggedIn ? (
          <>
            <li>
              <NavLink to="/login">로그인</NavLink>
            </li>
            <li>
              <NavLink to="/register">회원가입</NavLink>
            </li>
          </>
        ) : (
          <>
            <h3>{user.username}</h3>
            <li>
              <button onClick={onLogout}>로그아웃</button>
            </li>
          </>
        )}
      </ul>
    </HeaderWrapper>
  );
}

export default withRouter(Header);
