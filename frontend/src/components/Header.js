import React from 'react';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

const HeaderWrapper = styled.header`
  height: 100%;
  width: 100%;
  background-color: grey;

  ul {
    display: flex;
    list-style: none;
  }

  li + li {
    margin-left: 1rem;
  }
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

function Header(props) {
  return (
    <HeaderWrapper>
      <ul>
        <li>
          <NavLink to="/">홈</NavLink>
        </li>
        <li>
          <NavLink to="/login">로그인</NavLink>
        </li>
        <li>
          <NavLink to="/register">회원가입</NavLink>
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
      </ul>
    </HeaderWrapper>
  );
}

export default Header;
