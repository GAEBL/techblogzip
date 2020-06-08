import React, { useState } from 'react';
import Logo from '../Logo';
import styled from 'styled-components';
import { Link, withRouter } from 'react-router-dom';
import Button from '@material-ui/core/Button';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import { useSelector } from 'react-redux';
import LogoutButtonSet from '../LogoutButtonSet';
import SearchInput from '../../pages/SearchResultPage/SearchInput';

const NavMenuLink = styled(Link)`
  text-decoration: none;
  color: black;
  font-weight: bold;
`;

const InputWrapper = styled.div`
  padding: 0.5rem;
`;

// 버튼 네비
function NavMenu({ children, isLoggedIn }) {
  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <div>
      <Button
        aria-controls="simple-menu"
        aria-haspopup="true"
        onClick={handleClick}
      >
        <Logo size="1rem" />
      </Button>
      <Menu
        id="simple-menu"
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <NavMenuLink to="/">
          <MenuItem onClick={handleClose}>
            <Logo size="1rem" />
          </MenuItem>
        </NavMenuLink>
        <InputWrapper>
          <SearchInput dense={'true'} handleClose={handleClose} />
        </InputWrapper>
        <NavMenuLink to="/posts">
          <MenuItem onClick={handleClose}>LATEST-POST</MenuItem>
        </NavMenuLink>
        <NavMenuLink to="/trend">
          <MenuItem onClick={handleClose}>BLOG-TREND</MenuItem>
        </NavMenuLink>
        {!isLoggedIn && (
          <NavMenuLink to="/login">
            <MenuItem onClick={handleClose}>LOGIN</MenuItem>
          </NavMenuLink>
        )}
        {!isLoggedIn && (
          <NavMenuLink to="/register">
            <MenuItem onClick={handleClose}>REGISTER</MenuItem>
          </NavMenuLink>
        )}
        {isLoggedIn && (
          <MenuItem onClick={handleClose}>
            <LogoutButtonSet />
          </MenuItem>
        )}
      </Menu>
    </div>
  );
}

const NavWrapper = styled.nav`
  width: 100%;
`;

const SmallNavWrapper = styled.div`
  @media all and (min-width: 800px) {
    display: none;
  }
`;

const WideNavWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  .divider {
    display: flex;
    align-items: center;
  }
  @media all and (max-width: 800px) {
    display: none;
  }
`;

const NavLink = styled(Link)`
  font-family: 'VT323', monospace;
  font-size: 1.3rem;
  text-decoration: none;
  color: white;
  font-weight: bold;
  margin-right: 1rem;
`;

// 리얼 네비
function Nav({ setPage }) {
  const { isLoggedIn } = useSelector(({ user }) => ({
    isLoggedIn: user.isLoggedIn,
  }));

  return (
    <NavWrapper>
      <SmallNavWrapper>
        <NavMenu isLoggedIn={isLoggedIn} />
      </SmallNavWrapper>
      <WideNavWrapper>
        <div className="divider">
          <NavLink to="/">
            <Logo size="1rem" />
          </NavLink>
          <NavLink to="/posts">LATEST-POST</NavLink>
          <NavLink to="/trend">BLOG-TREND</NavLink>
        </div>
        <div className="divider">
          {!isLoggedIn ? (
            <>
              <NavLink to="/login">LOGIN</NavLink>
              <NavLink to="/register">REGISTER</NavLink>
            </>
          ) : (
            <LogoutButtonSet />
          )}
          <div className="search__input">
            <SearchInput dense={'true'} setPage={setPage} />
          </div>
        </div>
      </WideNavWrapper>
    </NavWrapper>
  );
}

export default withRouter(Nav);
