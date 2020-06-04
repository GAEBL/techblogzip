import React from 'react';
import ChartWrapper from '../../components/ChartWrapper';
import TrendCalendar from './charts/TrendCalendar';
import styled from 'styled-components';
import { colors } from '@material-ui/core';

const PostingDateWrapper = styled.div`
  .article__title {
    color: ${({ theme }) => theme.nonselectedMainColor[800]};
  }

  .article__subtitle {
    color: ${colors.grey[500]};
  }
`;

function PostingDate({ data }) {
  return (
    <PostingDateWrapper>
      <h1 className="article__title">블로그 포스팅 빈도수</h1>
      <h2 className="article__subtitle">
        해당 기업은 얼마나 포스팅을 자주할까요?
      </h2>
      <ChartWrapper>
        <TrendCalendar data={data} />
      </ChartWrapper>
    </PostingDateWrapper>
  );
}

export default PostingDate;
