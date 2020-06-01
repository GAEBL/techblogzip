import React, { useState } from 'react';
import styled from 'styled-components';
import SimpleTextField from '../../components/Material/SimpleTextField';
import SimpleButton from '../../components/Material/SimpleButton';
import SimpleDatePicker from '../../components/Material/SimpleDatePicker';
import targetDatas from '../../lib/targetDatas';
import { MenuItem, colors } from '@material-ui/core';
import DateFnsUtils from '@date-io/date-fns';
import koLocale from 'date-fns/locale/ko';
import { MuiPickersUtilsProvider } from '@material-ui/pickers';
import companyLogoData from '../../lib/companyLogoData';
import { useDispatch } from 'react-redux';
import { getTrendData } from '../../reducers/trend';
import moment from 'moment';

const TrendFormWrapper = styled.form`
  background-color: white;
  max-width: 600px;
  margin: 2rem auto;
  display: grid;
  grid-gap: 1rem;
  padding: 2rem;
  border: 1px solid ${colors.grey[200]};
  border-radius: 10px;
  box-shadow: 0 0px 1.1px rgba(0, 0, 0, 0.019), 0 0px 6.3px rgba(0, 0, 0, 0.027),
    0 0px 16.4px rgba(0, 0, 0, 0.033), 0 0px 34.7px rgba(0, 0, 0, 0.041),
    0 0px 80px rgba(0, 0, 0, 0.06);
`;

const Title = styled.h1`
  margin-bottom: 1rem;
  text-align: center;
`;

const DateWrapper = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1rem;
  @media all and (max-width: 600px) {
    grid-template-columns: 1fr;
  }
`;

function TrendForm(props) {
  const dispatch = useDispatch();
  const [trendForm, setTrendForm] = useState({
    company: 'WOOWABROS',
    startDate: new Date(),
    endDate: new Date(),
    targetData: 'lib',
  });

  const handleDateChange = (name, date) => {
    // 바뀌기 이전 값
    const start = trendForm.startDate.getTime();
    const end = trendForm.endDate.getTime();

    // 바뀐 이후 값
    const change_value = date.getTime();
    // 시작일이 바꼈는데, 종료일보다 커버린다? 아웃
    if (name === 'startDate' && change_value > end) {
      alert('시작일은 종료일보다 이전이어야 합니다.');
      return;
    }

    // 종료일이 바꼈는데, 시작일보다 작아버린다? 아웃
    if (name === 'endDate' && change_value < start) {
      alert('종료일은 시작일보다 이후여야 합니다.');
      return;
    }

    setTrendForm({
      ...trendForm,
      [name]: date,
    });
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setTrendForm({
      ...trendForm,
      [name]: value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const startDateStr = moment(trendForm.startDate).format('YYYY.MM.DD');
    const endDateStr = moment(trendForm.endDate).format('YYYY.MM.DD');
    dispatch(
      getTrendData({
        ...trendForm,
        startDate: startDateStr,
        endDate: endDateStr,
      }),
    );
  };

  return (
    <TrendFormWrapper onSubmit={handleSubmit}>
      <Title>
        <span role="img" aria-label="img">
          👀
        </span>{' '}
        원하는 기술 블로그의 트렌드를 확인해보세요.
      </Title>
      <SimpleTextField
        label="기술 블로그"
        select
        value={trendForm.company}
        name="company"
        onChange={handleChange}
      >
        {companyLogoData.map((data, i) => {
          if (i > 0) {
            return (
              <MenuItem key={i} value={data.name}>
                {data.displayName}
              </MenuItem>
            );
          }
          return null;
        })}
      </SimpleTextField>
      <DateWrapper>
        <MuiPickersUtilsProvider utils={DateFnsUtils} locale={koLocale}>
          <SimpleDatePicker
            label="필터링 시작일"
            value={trendForm.startDate}
            onChange={(date) => handleDateChange('startDate', date)}
          />
          <SimpleDatePicker
            label="필터링 종료일"
            value={trendForm.endDate}
            onChange={(date) => handleDateChange('endDate', date)}
          />
        </MuiPickersUtilsProvider>
      </DateWrapper>
      <SimpleTextField
        label="타겟 데이터"
        select
        value={trendForm.targetData}
        name="targetData"
        onChange={handleChange}
      >
        {targetDatas.map((target, i) => (
          <MenuItem key={i} value={target.targetData}>
            {target.displayName}
          </MenuItem>
        ))}
      </SimpleTextField>
      <SimpleButton fullWidth type="submit">
        트렌드 분석
      </SimpleButton>
    </TrendFormWrapper>
  );
}

export default TrendForm;
