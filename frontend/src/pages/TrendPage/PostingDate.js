import React from 'react';
import TrendCalendar from './charts/TrendCalendar';
import styled from 'styled-components';
import { colors } from '@material-ui/core';
import DateRangeIcon from '@material-ui/icons/DateRange';
import CountUp from 'react-countup';
import UpFadeIn from '../MainPage/UpFadeIn';
import moment from 'moment';
import MarkunreadMailboxOutlinedIcon from '@material-ui/icons/MarkunreadMailboxOutlined';

const DateIcon = styled(DateRangeIcon)`
  margin-right: 0.5rem;
`;

const PostIcon = styled(MarkunreadMailboxOutlinedIcon)`
  margin-right: 0.5rem;
`;

const PostingDateWrapper = styled.div`
  .article__title {
    margin-top: 5rem;
    font-size: 2rem;
    color: ${({ theme }) => theme.nonselectedMainColor[800]};
  }

  .article__subtitle {
    color: ${colors.grey[500]};
    margin-bottom: 1rem;
  }

  .divider__wrapper {
    margin: 1rem 0;
    display: grid;
    grid-template-columns: 1fr 1fr 1fr;
    @media all and (max-width: 700px) {
      grid-template-columns: 1fr;
    }

    .divider {
      margin: 1rem 0;
      .divider__title {
        font-size: 1.5rem;
      }

      .day__date {
        font-size: 4rem;
      }
    }
  }

  .title__with__icon {
    font-size: 1.5rem;
    display: flex;
    align-items: center;
  }
`;

const StyledCountUp = styled(CountUp)`
  font-size: 4rem;
  color: ${({ theme, color }) => (color ? color : theme.mainColor)};
  margin-right: 0.3rem;
`;

function PostingDate({ data }) {
  return (
    <PostingDateWrapper>
      <h1 className="article__title">
        <PostIcon />
        기술 블로그 포스팅 분석
      </h1>

      <h2 className="article__subtitle">
        해당 기업은 얼마나 포스팅을 자주할까요?
      </h2>
      <div className="divider__wrapper">
        <h3 className="divider">
          <div className="divider__title">첫 포스팅</div>

          <div className="day__date">
            {moment(data.endDay, 'YYYYMMDD').fromNow()}
          </div>
        </h3>
        <h3 className="divider">
          <div className="divider__title">최근 포스팅</div>
          <div className="day__date">
            {moment(data.startDay, 'YYYYMMDD').fromNow()}
          </div>
        </h3>
        <h3 className="divider">
          <div className="divider__title">총 포스팅 수</div>
          <UpFadeIn>
            <div className="day__date">
              <StyledCountUp end={data.data.length} />개
            </div>
          </UpFadeIn>
        </h3>
      </div>

      <h1 className="title__with__icon">
        <DateIcon />
        <span>최근 4년, 일간 포스팅 빈도수</span>
      </h1>
      <TrendCalendar data={data} />
    </PostingDateWrapper>
  );
}

export default PostingDate;
