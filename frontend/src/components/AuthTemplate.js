import React from 'react';
import styled from 'styled-components';
import SimpleButton from './Material/SimpleButton';
import SimpleTextField from './Material/SimpleTextField';
import Logo from './Logo';
import { Link } from 'react-router-dom';

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

function AuthTemplate({ type }) {
  return (
    <AuthTemplateWrapper>
      <Logo />
      <AuthForm>
        <SimpleTextField type="text" name="username" label="유저명" required />
        <SimpleTextField type="text" name="email" label="이메일" required />
        <SimpleTextField
          type="text"
          name="password"
          label="비밀번호"
          required
        />
        {type === 'register' && (
          <>
            <SimpleTextField
              type="text"
              name="passwordConfirm"
              label="비밀번호 확인"
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
  );
}

export default AuthTemplate;
