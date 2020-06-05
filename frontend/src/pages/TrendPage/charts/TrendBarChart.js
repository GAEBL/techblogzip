import React from 'react';
import ChartWrapper from '../../../components/ChartWrapper';
import { ResponsiveBar } from '@nivo/bar';

function TrendBarChart({ data }) {
  return (
    <ChartWrapper>
      <ResponsiveBar
        data={data}
        keys={[
          '삼성 SDS',
          '야놀자',
          '스포카',
          '쿠팡',
          '우아한 형제들',
          'TOAST',
          '카카오',
          '네이버',
        ]}
        indexBy="tag"
        margin={{ top: 50, right: 130, bottom: 50, left: 100 }}
        padding={0.3}
        layout="horizontal"
        colors={{ scheme: 'nivo' }}
        borderColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        axisTop={null}
        axisRight={null}
        axisBottom={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legend: '빈도수',
          legendPosition: 'middle',
          legendOffset: 32,
        }}
        axisLeft={{
          tickSize: 5,
          tickPadding: 5,
          tickRotation: 0,
          legendPosition: 'middle',
          legendOffset: -40,
        }}
        labelSkipWidth={12}
        labelSkipHeight={12}
        labelTextColor={{ from: 'color', modifiers: [['darker', 1.6]] }}
        legends={[
          {
            dataFrom: 'keys',
            anchor: 'bottom-right',
            direction: 'column',
            justify: false,
            translateX: 120,
            translateY: 0,
            itemsSpacing: 2,
            itemWidth: 100,
            itemHeight: 20,
            itemDirection: 'left-to-right',
            itemOpacity: 0.85,
            symbolSize: 20,
            effects: [
              {
                on: 'hover',
                style: {
                  itemOpacity: 1,
                },
              },
            ],
          },
        ]}
        animate={true}
        motionStiffness={90}
        motionDamping={15}
      />
    </ChartWrapper>
  );
}

export default TrendBarChart;
