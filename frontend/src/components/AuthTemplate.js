import React, { useEffect } from 'react';
import styled from 'styled-components';
import SimpleButton from './Material/SimpleButton';
import SimpleTextField from './Material/SimpleTextField';
import Logo from './Logo';
import { Link, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { changeInput, login, register } from '../reducers/auth';
import { colors, Fade } from '@material-ui/core';

const AuthTemplateWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding: 1rem;
`;

const AuthForm = styled.form`
  display: grid;
  grid-gap: 0.8rem;
  width: 100%;
  max-width: 400px;
  margin-top: 2rem;
  padding: 2rem;
  background-color: white;
  border: 1px solid ${colors.grey[200]};
  border-radius: 10px;
  box-shadow: 0 0px 1.1px rgba(0, 0, 0, 0.019), 0 0px 6.3px rgba(0, 0, 0, 0.027),
    0 0px 16.4px rgba(0, 0, 0, 0.033), 0 0px 34.7px rgba(0, 0, 0, 0.041),
    0 0px 80px rgba(0, 0, 0, 0.06);
`;

const ButtonContainer = styled.div`
  display: grid;
  grid-template-columns: 1fr auto;
  grid-gap: 1rem;
  align-items: center;
`;

const StyledLink = styled(Link)`
  color: black;
`;

function AuthTemplate({ type, history }) {
  const { form, isLoggedIn } = useSelector(({ auth, user }) => ({
    form: auth[type],
    isLoggedIn: user.isLoggedIn,
  }));

  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(changeInput({ type, name, value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (type === 'login') {
      dispatch(login({ username: form.username, password: form.password }));
    } else {
      dispatch(
        register({
          username: form.username,
          password: form.password,
          email: form.email,
          is_subscribed: true,
        }),
      );
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      history.push('/');
    }
  }, [isLoggedIn, history, dispatch]);

  return (
    <Fade in={true} {...{ timeout: 1000 }}>
      <AuthTemplateWrapper>
        <AuthForm onSubmit={handleSubmit}>
          <Logo margin />
          <SimpleTextField
            value={form.username}
            type="text"
            name="username"
            label="유저명"
            onChange={handleChange}
            required
          />

          <SimpleTextField
            value={form.password}
            type="password"
            name="password"
            label="비밀번호"
            onChange={handleChange}
            required
          />
          {type === 'register' && (
            <>
              <SimpleTextField
                value={form.passwordConfirm}
                type="password"
                name="passwordConfirm"
                label="비밀번호 확인"
                onChange={handleChange}
                required
              />
              <SimpleTextField
                value={form.email}
                type="text"
                name="email"
                label="이메일"
                onChange={handleChange}
                required
              />
            </>
          )}
          <ButtonContainer>
            <SimpleButton type="submit">
              {type === 'login' ? '로그인' : '회원가입'}
            </SimpleButton>
            <StyledLink to={type === 'login' ? '/register' : '/login'}>
              {type === 'login' ? '회원가입' : '로그인'}
            </StyledLink>
          </ButtonContainer>
        </AuthForm>
      </AuthTemplateWrapper>
    </Fade>
  );
}

export default withRouter(AuthTemplate);
