import clinet from '../client';

export const RecentPost = {
    getpost: ({company, sort}) =>
    client.post('/api/techblog/posts', {
        company,
        sort
    })
}