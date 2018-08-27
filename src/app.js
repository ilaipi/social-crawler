import igcrawler from './modules/instagram/crawler';

const crawl = async () => {
  await igcrawler('ilaipi2');
  process.exit(0);
};

crawl();
