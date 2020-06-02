import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMainpageData, clearPosts } from '../../reducers/post';
import styled from 'styled-components';
import Introduce from './Introduce';
import Logos from './Logos';
import CountUp from 'react-countup';
import UpFadeIn from './UpFadeIn';
import { colors } from '@material-ui/core';
import FakeLikeBtn from './FakeLikeBtn';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import { Link } from 'react-router-dom';

const MainPageWrapper = styled.div``;

const PageSection = styled.section`
  height: 100vh;
  width: 100%;
  position: relative;
  background-color: ${({ bgColor }) => bgColor};
  .contents {
    max-width: ${({ theme }) => theme.maxPageWidth};
    margin: 0 auto;
    height: 100%;
    width: 100%;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

    .contents__text {
      font-size: 3rem;
      font-weight: bold;
    }
    @media all and (max-width: 700px) {
      .contents__text {
        font-size: 1.3rem;
      }
    }
  }
`;

const ContentsLink = styled(Link)`
  display: flex;
  align-items: center;
  text-decoration: none;
  color: black;
  font-size: 1.5rem;
  font-weight: bold;
  padding: 1rem;
  :hover {
    animation: beat 0.6s infinite alternate;
  }

  @keyframes beat {
    to {
      transform: scale(1.2);
    }
  }
`;

const StyledCountUp = styled(CountUp)`
  font-size: 3rem;
  color: ${({ theme, color }) => (color ? color : theme.mainColor)};
  margin-right: 0.3rem;
  @media all and (max-width: 600px) {
    font-size: 1.3rem;
  }
`;

const RightIcon = styled(ChevronRightIcon)`
  color: ${colors.deepOrange[500]};
`;

function MainPage(props) {
  const { pageData } = useSelector(({ post, loading }) => ({
    pageData: post.pageData,
  }));

  const dispatch = useDispatch();
  useEffect(() => {
    // 메인페이지만 패딩 탑 0로..
    const contents = document.querySelector('#contents');
    contents.style.paddingTop = 0;

    dispatch(getMainpageData());
    return () => {
      dispatch(clearPosts());
      // 나가면서 패딩 탑 주기
      contents.style.paddingTop = '64px';
    };
  }, [dispatch]);
  return (
    <MainPageWrapper>
      <PageSection gradient={false}>
        <Introduce />
      </PageSection>
      <PageSection bgColor="#FAFAFA" gradient={false}>
        <div className="contents">
          <UpFadeIn>
            <Logos />
            <span className="contents__text">
              <StyledCountUp
                end={
                  pageData && pageData.companyCount ? pageData.companyCount : 9
                }
                duration={3}
                separator={','}
              />
              개 기업의 기술 개발 블로그
            </span>
            <ContentsLink className="content__subtext">
              최신글 보러가기 <RightIcon />
            </ContentsLink>
          </UpFadeIn>
        </div>
      </PageSection>
      <PageSection bgColor={colors.grey[200]}>
        <div className="contents">
          <UpFadeIn>
            <span className="contents__text">
              <StyledCountUp
                end={
                  pageData && pageData.postsCount ? pageData.postsCount : 1400
                }
                duration={3}
                separator={','}
              />
              개의 블로그 포스트 분석
            </span>
            <ContentsLink className="content__subtext">
              트렌드 분석하기 <RightIcon />
            </ContentsLink>
          </UpFadeIn>
        </div>
      </PageSection>
      <PageSection bgColor={colors.orange[400]}>
        <div className="contents">
          <UpFadeIn>
            <FakeLikeBtn />
            <ContentsLink to="/register" className="content__subtext">
              <span>마음에 드는 글, 가입하고 찜하세요!</span> <RightIcon />
            </ContentsLink>
          </UpFadeIn>
        </div>
      </PageSection>
    </MainPageWrapper>
  );
}

export default MainPage;
