import React, { useEffect, useState } from 'react';
import { ResponsiveLine } from '@nivo/line';
import styled from 'styled-components';

const ChartContainer = styled.div`
  height: 400px;
  width: 100%;
  @media all and (max-width: 600px) {
    height: 250px;
    width: 350px;
  }
  @media all and (max-width: 350px) {
    height: 200px;
    width: 200px;
  }
`;

function FakeLineChart(props) {
  const [dataNumber, setDataNumber] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => {
      setDataNumber((prev) => {
        if (prev === data.length - 1) {
          return 0;
        } else {
          return prev + 1;
        }
      });
    }, 1500);

    return () => {
      clearInterval(interval);
    };
  }, []);

  return (
    <ChartContainer>
      <ResponsiveLine
        data={data[dataNumber]}
        margin={{ top: 30, right: 30, bottom: 50, left: 30 }}
        xScale={{ type: 'point' }}
        yScale={{
          type: 'linear',
          min: 'auto',
          max: 'auto',
          reverse: false,
        }}
        axisTop={null}
        axisRight={null}
        axisBottom={null}
        axisLeft={null}
        colors={{ scheme: 'yellow_orange_red' }}
        pointSize={8}
        pointColor={{ theme: 'background' }}
        pointBorderWidth={8}
        pointBorderColor={{ from: 'serieColor' }}
        enablePointLabel={false}
        pointLabel="y"
        pointLabelYOffset={-12}
        lineWidth={5}
        enableGridX={false}
        enableGridY={false}
      />
    </ChartContainer>
  );
}

export default FakeLineChart;

const data = [
  [
    {
      id: 'japan',
      color: 'hsl(243, 70%, 50%)',
      data: [
        {
          x: 'plane',
          y: 63,
        },
        {
          x: 'helicopter',
          y: 188,
        },
        {
          x: 'boat',
          y: 97,
        },
        {
          x: 'train',
          y: 64,
        },
        {
          x: 'subway',
          y: 73,
        },
        {
          x: 'bus',
          y: 133,
        },
        {
          x: 'car',
          y: 6,
        },
        {
          x: 'moto',
          y: 252,
        },
        {
          x: 'bicycle',
          y: 188,
        },
        {
          x: 'horse',
          y: 291,
        },
        {
          x: 'skateboard',
          y: 57,
        },
        {
          x: 'others',
          y: 232,
        },
      ],
    },
    {
      id: 'france',
      color: 'hsl(156, 70%, 50%)',
      data: [
        {
          x: 'plane',
          y: 288,
        },
        {
          x: 'helicopter',
          y: 267,
        },
        {
          x: 'boat',
          y: 25,
        },
        {
          x: 'train',
          y: 247,
        },
        {
          x: 'subway',
          y: 288,
        },
        {
          x: 'bus',
          y: 208,
        },
        {
          x: 'car',
          y: 163,
        },
        {
          x: 'moto',
          y: 101,
        },
        {
          x: 'bicycle',
          y: 206,
        },
        {
          x: 'horse',
          y: 288,
        },
        {
          x: 'skateboard',
          y: 149,
        },
        {
          x: 'others',
          y: 249,
        },
      ],
    },
    {
      id: 'us',
      color: 'hsl(119, 70%, 50%)',
      data: [
        {
          x: 'plane',
          y: 59,
        },
        {
          x: 'helicopter',
          y: 81,
        },
        {
          x: 'boat',
          y: 254,
        },
        {
          x: 'train',
          y: 41,
        },
        {
          x: 'subway',
          y: 176,
        },
        {
          x: 'bus',
          y: 117,
        },
        {
          x: 'car',
          y: 255,
        },
        {
          x: 'moto',
          y: 191,
        },
        {
          x: 'bicycle',
          y: 243,
        },
        {
          x: 'horse',
          y: 294,
        },
        {
          x: 'skateboard',
          y: 252,
        },
        {
          x: 'others',
          y: 107,
        },
      ],
    },
  ],
  [
    {
      id: 'japan',
      color: 'hsl(332, 70%, 50%)',
      data: [
        {
          x: 'plane',
          y: 79,
        },
        {
          x: 'helicopter',
          y: 243,
        },
        {
          x: 'boat',
          y: 140,
        },
        {
          x: 'train',
          y: 94,
        },
        {
          x: 'subway',
          y: 222,
        },
        {
          x: 'bus',
          y: 194,
        },
        {
          x: 'car',
          y: 2,
        },
        {
          x: 'moto',
          y: 95,
        },
        {
          x: 'bicycle',
          y: 83,
        },
        {
          x: 'horse',
          y: 237,
        },
        {
          x: 'skateboard',
          y: 79,
        },
        {
          x: 'others',
          y: 160,
        },
      ],
    },
    {
      id: 'france',
      color: 'hsl(63, 70%, 50%)',
      data: [
        {
          x: 'plane',
          y: 168,
        },
        {
          x: 'helicopter',
          y: 230,
        },
        {
          x: 'boat',
          y: 45,
        },
        {
          x: 'train',
          y: 197,
        },
        {
          x: 'subway',
          y: 111,
        },
        {
          x: 'bus',
          y: 262,
        },
        {
          x: 'car',
          y: 189,
        },
        {
          x: 'moto',
          y: 189,
        },
        {
          x: 'bicycle',
          y: 276,
        },
        {
          x: 'horse',
          y: 181,
        },
        {
          x: 'skateboard',
          y: 254,
        },
        {
          x: 'others',
          y: 295,
        },
      ],
    },
    {
      id: 'us',
      color: 'hsl(314, 70%, 50%)',
      data: [
        {
          x: 'plane',
          y: 290,
        },
        {
          x: 'helicopter',
          y: 63,
        },
        {
          x: 'boat',
          y: 248,
        },
        {
          x: 'train',
          y: 247,
        },
        {
          x: 'subway',
          y: 220,
        },
        {
          x: 'bus',
          y: 19,
        },
        {
          x: 'car',
          y: 51,
        },
        {
          x: 'moto',
          y: 219,
        },
        {
          x: 'bicycle',
          y: 237,
        },
        {
          x: 'horse',
          y: 17,
        },
        {
          x: 'skateboard',
          y: 31,
        },
        {
          x: 'others',
          y: 112,
        },
      ],
    },
  ],
  [
    {
      id: 'japan',
      color: 'hsl(221, 70%, 50%)',
      data: [
        {
          x: 'plane',
          y: 184,
        },
        {
          x: 'helicopter',
          y: 179,
        },
        {
          x: 'boat',
          y: 64,
        },
        {
          x: 'train',
          y: 87,
        },
        {
          x: 'subway',
          y: 192,
        },
        {
          x: 'bus',
          y: 217,
        },
        {
          x: 'car',
          y: 22,
        },
        {
          x: 'moto',
          y: 127,
        },
        {
          x: 'bicycle',
          y: 53,
        },
        {
          x: 'horse',
          y: 227,
        },
        {
          x: 'skateboard',
          y: 276,
        },
        {
          x: 'others',
          y: 140,
        },
      ],
    },
    {
      id: 'france',
      color: 'hsl(145, 70%, 50%)',
      data: [
        {
          x: 'plane',
          y: 227,
        },
        {
          x: 'helicopter',
          y: 157,
        },
        {
          x: 'boat',
          y: 62,
        },
        {
          x: 'train',
          y: 297,
        },
        {
          x: 'subway',
          y: 188,
        },
        {
          x: 'bus',
          y: 186,
        },
        {
          x: 'car',
          y: 183,
        },
        {
          x: 'moto',
          y: 6,
        },
        {
          x: 'bicycle',
          y: 112,
        },
        {
          x: 'horse',
          y: 209,
        },
        {
          x: 'skateboard',
          y: 59,
        },
        {
          x: 'others',
          y: 77,
        },
      ],
    },
    {
      id: 'us',
      color: 'hsl(19, 70%, 50%)',
      data: [
        {
          x: 'plane',
          y: 290,
        },
        {
          x: 'helicopter',
          y: 90,
        },
        {
          x: 'boat',
          y: 34,
        },
        {
          x: 'train',
          y: 229,
        },
        {
          x: 'subway',
          y: 145,
        },
        {
          x: 'bus',
          y: 126,
        },
        {
          x: 'car',
          y: 271,
        },
        {
          x: 'moto',
          y: 34,
        },
        {
          x: 'bicycle',
          y: 290,
        },
        {
          x: 'horse',
          y: 263,
        },
        {
          x: 'skateboard',
          y: 10,
        },
        {
          x: 'others',
          y: 11,
        },
      ],
    },
  ],
];
