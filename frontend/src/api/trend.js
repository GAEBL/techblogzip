import client from '../client';

export const Trend = {
  /**
  {
	"data": [
      { "id": "java", "name": "java", "value": 1001 },
      { "id": "javascript", "name": "javascript", "value": 898 },
    ]
  }
   */
  getRankTags: ({ company, startDate, endDate, targetData }) =>
    client.get(`/trend/`, {
      params: {
        company,
        startdate: startDate,
        enddate: endDate,
        target: targetData,
      },
    }),
  /*
  "data": [
    {
      "id": "Django",
      "data": [
          {
            "x": "2016-01-06",
            "y": 320
          },
        ]
      }
    ]
  }
  */
  getTagDates: ({ tag, company }) =>
    client.get(`/trend/tag/`, {
      params: {
        tag,
        company,
      },
    }),
  /**
  {
	"startDay": "2020-06-02",
  "endDay": "2003-12-13",
  "data": [
      {
        "day": "2016-02-22",
        "value": 101
      },
    ],
  }
   */
  getCompanyPostingDates: ({ company }) =>
    client.get(`/trend/posts/date/`, {
      params: {
        company,
      },
    }),
};
