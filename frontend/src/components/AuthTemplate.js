import React, { useEffect, useState } from 'react';
import styled from 'styled-components';
import SimpleButton from './Material/SimpleButton';
import SimpleTextField from './Material/SimpleTextField';
import Logo from './Logo';
import { Link, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { changeInput, login, register, clearError } from '../reducers/auth';
import { colors, Fade } from '@material-ui/core';
import LoadingSpinner from './LoadingSpinner';

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
  const { form, isLoggedIn, error, loading } = useSelector(
    ({ auth, user, loading }) => ({
      form: auth[type],
      isLoggedIn: user.isLoggedIn,
      error: auth.error,
      loading: loading[`auth/${type.toUpperCase()}`],
    }),
  );

  const [errorMessage, setErrorMessage] = useState({
    username: { state: false, text: '' },
    password: { state: false, text: '' },
    passwordConfirm: { state: false, text: '' },
    email: { state: false, text: '' },
  });

  const clearErrorMessage = () => {
    setErrorMessage({
      username: { state: false, text: '' },
      password: { state: false, text: '' },
      passwordConfirm: { state: false, text: '' },
      email: { state: false, text: '' },
    });
  };

  const dispatch = useDispatch();
  const handleChange = (e) => {
    const { name, value } = e.target;
    dispatch(changeInput({ type, name, value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    clearErrorMessage();
    if (type === 'login') {
      dispatch(login({ username: form.username, password: form.password }));
    } else {
      if (form.password !== form.passwordConfirm) {
        setErrorMessage({
          ...errorMessage,
          passwordConfirm: { state: true, text: '비밀번호가 다릅니다.' },
        });
        return;
      }
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
    clearErrorMessage();
    if (isLoggedIn) {
      history.push('/');
    }
  }, [isLoggedIn, history, dispatch]);

  useEffect(() => {
    if (error) {
      const { status, config } = error.response;
      if (config.url === '/auth/login/') {
        if (status === 404) {
          setErrorMessage({
            ...errorMessage,
            username: { state: true, text: '존재하지 않는 사용자 입니다.' },
            password: { state: true, text: '존재하지 않는 사용자 입니다.' },
          });
        } else if (status === 400) {
          setErrorMessage({
            ...errorMessage,
            password: { state: true, text: '올바른 비밀번호를 입력해주세요.' },
          });
        }
      } else {
        if (status === 409) {
          setErrorMessage({
            ...errorMessage,
            username: { state: true, text: '이미 존재하는 사용자입니다.' },
          });
        } else {
          const { data } = error.response;
          if (data.email) {
            setErrorMessage({
              ...errorMessage,
              email: { state: true, text: data.email },
            });
          }
        }
      }
    }
    dispatch(clearError());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [error]);

  return (
    <Fade in={true} {...{ timeout: 1000 }}>
      <AuthTemplateWrapper>
        <AuthForm onSubmit={handleSubmit}>
          <Logo margin />
          <SimpleTextField
            value={form.username}
            error={errorMessage.username.state}
            helperText={errorMessage.username.text}
            type="text"
            name="username"
            label="유저명"
            onChange={handleChange}
            required
          />
          <SimpleTextField
            value={form.password}
            error={errorMessage.password.state}
            helperText={errorMessage.password.text}
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
                error={errorMessage.passwordConfirm.state}
                helperText={errorMessage.passwordConfirm.text}
                type="password"
                name="passwordConfirm"
                label="비밀번호 확인"
                onChange={handleChange}
                required
              />
              <SimpleTextField
                value={form.email}
                error={errorMessage.email.state}
                helperText={errorMessage.email.text}
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
              {loading ? (
                <LoadingSpinner
                  type="cylon"
                  size={'30px'}
                  color={colors.grey[100]}
                />
              ) : type === 'login' ? (
                '로그인'
              ) : (
                '회원가입'
              )}
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
