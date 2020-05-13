import client from '../client';

export const Test = {
  testapi: () => client.get('/test'),
};
