import mongo from './common/mongo/';
import config from './modules/util/config';
import igcrawler from './modules/instagram/crawler';

const crawl = async () => {
  await mongo(config);
  await igcrawler('kingljames');
  process.exit(0);
};

crawl();
