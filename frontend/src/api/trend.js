import client from '../client';

export const Trend = {
  getTrendResults: ({ company, startDate, endDate, targetData }) =>
    client.get(`/trend/`, {
      params: {
        company,
        startdate: startDate,
        enddate: endDate,
        targetdata: targetData,
      },
    }),
};
