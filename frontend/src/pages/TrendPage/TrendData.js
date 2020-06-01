import React from 'react';
import { useSelector } from 'react-redux';

function TrendData(props) {
  const { data, loading } = useSelector(({ trend, loading }) => ({
    loading: loading['trend/GET_TREND_DATA'],
    data: trend.data,
  }));

  return (
    <div>
      여기서 데이터를 가져와 보여줄겁니다
      {!loading && data ? (
        <div>로딩완료</div>
      ) : (
        <div>로딩 또는 데이터 없음</div>
      )}
    </div>
  );
}

export default TrendData;
