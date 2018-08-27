import { get } from '../util/request';

export default async (username) => {
  const page = await get(`https://www.instagram.com/${username}`);
  console.log('====page', page);
};
