import React, { useEffect } from 'react';
import styled from 'styled-components';
import SimpleButton from './Material/SimpleButton';
import SimpleTextField from './Material/SimpleTextField';
import Logo from './Logo';
import { Link, withRouter } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { changeInput, login, register } from '../reducers/auth';

const AuthTemplateWrapper = styled.div`
  width: 100%;
  height: 100%;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const AuthForm = styled.form`
  display: grid;
  grid-gap: 0.8rem;
  min-width: 300px;
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

const StyledCheckBox = styled.div`
  justify-self: center;
  align-self: center;
  padding: 0.5rem 0;
  input {
    margin-right: 0.5rem;
  }
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

  const handleCheckBox = (e) => {
    const { name, value } = e.target;
    dispatch(
      changeInput({ type, name, value: value === 'false' ? true : false }),
    );
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
          is_subscribed: form.is_subscribed,
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
    <AuthTemplateWrapper>
      <Logo />
      <AuthForm onSubmit={handleSubmit}>
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
            <StyledCheckBox>
              <input
                type="checkbox"
                name="is_subscribed"
                value={form.is_subscribed}
                onChange={handleCheckBox}
              />
              <label htmlFor="is_subscribed">이메일 구독에 동의합니다.</label>
            </StyledCheckBox>
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
  );
}

export default withRouter(AuthTemplate);
