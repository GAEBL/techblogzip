import React, { useMemo, useEffect } from 'react';
import styled from 'styled-components';
import TrendPieChart from './charts/TrendPieChart';
import Tag from '../../components/Tag';
import CountUp from 'react-countup';
import UpFadeIn from '../MainPage/UpFadeIn';
import TagCountByCompanies from './TagCountByCompanies';
import { useSelector, useDispatch } from 'react-redux';
import LoadingSpinner from '../../components/LoadingSpinner';
import { colors } from '@material-ui/core';
import SortIcon from '@material-ui/icons/Sort';
import EmojiEventsOutlinedIcon from '@material-ui/icons/EmojiEventsOutlined';
import VisibilityOutlinedIcon from '@material-ui/icons/VisibilityOutlined';
import TrackChangesOutlinedIcon from '@material-ui/icons/TrackChangesOutlined';
import { getTagCounts } from '../../reducers/trend';

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

function InformationTemplate({ rankTags }) {
  const { selectedDate } = useSelector(({ trend }) => ({
    selectedDate: trend.selectedDate,
  }));

  const tagNames = useMemo(() => {
    return rankTags.map((tag) => tag.name);
  }, [rankTags]);

  const dispatch = useDispatch();
  useEffect(() => {
    console.log(tagNames);
    dispatch(getTagCounts(tagNames));
  }, [dispatch, tagNames]);

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
          <h1 className="article__title">블로그내 TOP10 태그별 비율</h1>
        </div>
        <UpFadeIn>
          <TrendPieChart data={rankTags} />
        </UpFadeIn>
      </div>
      <div className="divider">
        <div className="title__wrapper">
          <SortIcon />
          <h1 className="article__title">기업별 TOP10 태그 비율</h1>
        </div>
        <TagCountByCompanies />
      </div>
    </TemplateWrapper>
  );
}

export default InformationTemplate;
