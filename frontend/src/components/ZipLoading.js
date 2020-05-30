import React from 'react';
import styled from 'styled-components';

const ZipLoadingWrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin: 5rem 0;
`;

const ImageWrapper = styled.div`
  width: 60px;
  display: flex;
  justify-content: center;
  background-color: white;
  padding: 1rem;
  border-radius: 50%;
  .loading__img {
    width: 100%;
  }
`;

const Text = styled.div`
  font-size: 0.8rem;
  margin-top: 0.5rem;
  color: ${({ theme }) => theme.mainColor};
`;

function ZipLoading(props) {
  const path = process.env.PUBLIC_URL + '/images/zipanimation.gif';
  return (
    <ZipLoadingWrapper>
      <ImageWrapper>
        <img className="loading__img" src={path} alt="loading" />
      </ImageWrapper>
      <Text>로딩중..</Text>
    </ZipLoadingWrapper>
  );
}

export default ZipLoading;
