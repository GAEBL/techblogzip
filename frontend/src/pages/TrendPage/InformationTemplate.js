import React from 'react';
import styled from 'styled-components';
import TrendPieChart from './charts/TrendPieChart';
import Tag from '../../components/Tag';
import CountUp from 'react-countup';
import UpFadeIn from '../MainPage/UpFadeIn';
import TrendLineChart from './charts/TrendLineChart';
import TagButtons from './TagButtons';
import { useSelector } from 'react-redux';
import LoadingSpinner from '../../components/LoadingSpinner';
import { colors } from '@material-ui/core';

const TemplateWrapper = styled.article`
  margin-bottom: 2rem;
  .article__title {
    font-size: 2rem;
  }
  .divider {
    width: 100%;
    margin: 2rem 0;
  }
  .number {
    font-size: 5rem;
  }
`;

const StyledCountUp = styled(CountUp)`
  font-size: 5rem;
  color: ${({ theme, color }) => (color ? color : theme.mainColor)};
  margin-right: 0.3rem;
`;

function InformationTemplate({ rankTags }) {
  const { tagDates, loading } = useSelector(({ trend, loading }) => ({
    tagDates: trend.tagDates,
    loading: loading['trend/GET_TAG_DATES'],
  }));

  return (
    <TemplateWrapper>
      <div className="divider">
        <h1 className="article__title">최다 등장 #태그</h1>
        <UpFadeIn>
          <Tag name={rankTags[0].name} size="5rem" />
        </UpFadeIn>
      </div>
      <div className="divider">
        <h1 className="article__title">등장 횟수</h1>
        <UpFadeIn>
          <h3 className="number">
            <StyledCountUp start={0} end={rankTags[0].value} duration={2} />회
          </h3>
        </UpFadeIn>
      </div>
      <div className="divider">
        <h1 className="article__title">상위 태그 랭크 비율</h1>
        <UpFadeIn>
          <TrendPieChart data={rankTags} />
        </UpFadeIn>
      </div>
      <div className="divider">
        <h1 className="article__title">일별 태그 언급</h1>
        <TagButtons tags={rankTags} />
        {loading ? (
          <LoadingSpinner color={colors.orange[500]} size={80} type={'cylon'} />
        ) : tagDates ? (
          <TrendLineChart data={tagDates} />
        ) : (
          <div>태그날짜 없음!</div>
        )}
      </div>
    </TemplateWrapper>
  );
}

export default InformationTemplate;
