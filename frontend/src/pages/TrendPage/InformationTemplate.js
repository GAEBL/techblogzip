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
import TimelineIcon from '@material-ui/icons/Timeline';
import EmojiEventsOutlinedIcon from '@material-ui/icons/EmojiEventsOutlined';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import TrackChangesOutlinedIcon from '@material-ui/icons/TrackChangesOutlined';

const TemplateWrapper = styled.article`
  margin-bottom: 2rem;
  .date {
    font-size: 2rem;
  }
  .title__wrapper {
    display: flex;
    align-items: center;
    .article__title {
      font-size: 1.5rem;
      margin-left: 0.5rem;
    }
  }

  .divider {
    width: 100%;
    margin: 2rem 0;
  }
  .number {
    font-size: 5rem;
  }
`;

const MostTagSection = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  @media all and (max-width: 700px) {
    grid-template-columns: 1fr;
  }
`;

const StyledCountUp = styled(CountUp)`
  font-size: 5rem;
  color: ${({ theme, color }) => (color ? color : theme.mainColor)};
  margin-right: 0.3rem;
`;

const LineChartLoadingWrapper = styled.div`
  height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
`;

function InformationTemplate({ rankTags }) {
  const { tagDates, loading, selectedDate } = useSelector(
    ({ trend, loading }) => ({
      selectedDate: trend.selectedDate,
      tagDates: trend.tagDates,
      loading: loading['trend/GET_TAG_DATES'],
    }),
  );

  return (
    <TemplateWrapper>
      <h1 className="date">
        {selectedDate && (
          <>
            {selectedDate.start && selectedDate.start.toLocaleDateString()} ~{' '}
            {selectedDate.end && selectedDate.end.toLocaleDateString()}
          </>
        )}
      </h1>
      <MostTagSection>
        <div className="divider">
          <div className="title__wrapper">
            <EmojiEventsOutlinedIcon />
            <h1 className="article__title">최다 등장 태그</h1>
          </div>
          <UpFadeIn>
            <Tag name={rankTags[0].name} size="5rem" />
          </UpFadeIn>
        </div>
        <div className="divider">
          <div className="title__wrapper">
            <VisibilityOutlinedIcon />
            <h1 className="article__title">등장 횟수</h1>
          </div>
          <UpFadeIn>
            <h3 className="number">
              <StyledCountUp start={0} end={rankTags[0].value} duration={2} />회
            </h3>
          </UpFadeIn>
        </div>
      </MostTagSection>
      <div className="divider">
        <div className="title__wrapper">
          <TrackChangesOutlinedIcon />
          <h1 className="article__title">상위 태그별 비율</h1>
        </div>
        <UpFadeIn>
          <TrendPieChart data={rankTags} />
        </UpFadeIn>
      </div>
      <div className="divider">
        <div className="title__wrapper">
          <TimelineIcon />
          <h1 className="article__title">상위 태그 빈도수</h1>
        </div>
        <TagButtons tags={rankTags} />
        {loading ? (
          <LineChartLoadingWrapper>
            <LoadingSpinner
              color={colors.orange[500]}
              size={80}
              type={'bubbles'}
            />
          </LineChartLoadingWrapper>
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
