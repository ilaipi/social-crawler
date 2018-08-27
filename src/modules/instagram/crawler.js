import cheerio from 'cheerio';
import { get as getField } from 'lodash';

import { get } from '../util/request';

/**
 * 把script标签转成json对象
 * 通过eval方法，直接执行这段赋值语句
 */
const script2JSON = script => {
  let window = {};
  eval(script);
  return window._sharedData;
};

const handlePage = async profile => {
  const posts = profile.edges;
  for (let { node: post } of posts) {
    console.log('=====post', post);
  }
};

export default async (username) => {
  const page = await get(`https://www.instagram.com/${username}`);
  const $ = cheerio.load(page.data);
  const script = $('span#react-root').next().html();
  const data = script2JSON(script);
  const profile = getField(data, 'entry_data.ProfilePage[0].graphql.user.edge_owner_to_timeline_media');
  await handlePage(profile);
  console.log('=====profile', profile.count, profile.edges.length);
};
