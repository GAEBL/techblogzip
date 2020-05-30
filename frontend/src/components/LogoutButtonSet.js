import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../reducers/user';
import styled from 'styled-components';
import { colors } from '@material-ui/core';
import { withRouter } from 'react-router-dom';

const LogoutSetWrapper = styled.div`
  display: flex;
  margin-right: 1rem;

  .username {
    font-weight: bold;
    color: ${colors.deepOrange[200]};
    margin-right: 1rem;
  }

  .logout__button {
    font-weight: bold;
    background-color: transparent;
    border: none;
    color: white;
    cursor: pointer;
    :focus {
      outline: none;
    }
  }

  @media all and (max-width: 800px) {
    .logout__button {
      color: black;
    }
  }
`;

function LogoutButtonSet({ history }) {
  const dispatch = useDispatch();
  const { user } = useSelector(({ user }) => ({
    user: user.currentUser,
  }));

  const onLogout = () => {
    dispatch(logout());
    history.push('/');
  };

  return (
    <LogoutSetWrapper>
      <span className="username">{user.username}</span>
      <button className="logout__button" onClick={onLogout}>
        로그아웃
      </button>
    </LogoutSetWrapper>
  );
}

export default withRouter(LogoutButtonSet);
