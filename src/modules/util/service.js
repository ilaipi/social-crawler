import Promise from 'bluebird';
import redis from 'redis';
import puppeteer from 'puppeteer';
import axios from 'axios';

import { USER_AGENT } from './const';
import logger from './log';
import config from './config';

Promise.promisifyAll(redis.RedisClient.prototype);
Promise.promisifyAll(redis.Multi.prototype);

let redisClient;

const PROXY_API = 'http://dynamic.goubanjia.com/dynamic/get/6545520efc32a5e1f9c049ba1fca8a81.html?sep=1&random=true';
let currentProxy;

const getProxy = async () => {
  try {
    const { data } = await axios.get(PROXY_API, { timeout: 30 * 1000 });
    currentProxy = data && data.trim();
  } catch (err) {
    logger.warn({ err }, '获取代理服务器执行异常');
  }
  setTimeout(getProxy, 30 * 1000);
};

/**
 * 统一启动浏览器
 * 不考虑已经启动了多少个
 * 统一启动，方便启动时随机分配代理
 * Tips: 一开始如果是多台服务器，可以暂时不用代理
 */
const launch = async (proxy) => {
  const options = {
    args: ['--lang=en-US', '--disk-cache-size=0']
  };
  if (proxy && currentProxy) {
    options.args.push(`--proxy-server=${currentProxy}`);
    logger.info({ currentProxy }, 'launch with proxy');
  }
  const browser = await puppeteer.launch(options);
  return browser;
};

const openPage = async (proxy = false) => {
  const browser = await launch(proxy);
  const page = await browser.newPage();
  await page.setUserAgent(USER_AGENT);
  handleEvents(page);
  return page;
};

/**
 * 页面打开地址
 * 默认等待时间1分钟
 */
const gotoPage = async ({ page, url, timeout = 1 * 60 * 1000 }) => {
  await page.goto(url, {
    headless: false,
    timeout,
    waitUntil: 'networkidle2'
  });
};

const closePage = async (page) => {
  const browser = await page.browser();
  try {
    await page.close();
  } catch (err) {
    logger.warn({ err }, '关闭页面出现异常');
  } finally {
    browser.close();
  }
};

const createClient = async () => {
  if (redisClient) return redisClient;
  redisClient = await redis.createClient(config.redis);
  return redisClient;
};

const name = 'helper';

export { launch, openPage, gotoPage, closePage, createClient, getProxy, name };

/**
 * 处理页面的事件
 *   1 console 页面的console语句
 */
const handleEvents = (page) => {
  // 在evaluate方法中调用console.log 不能在控制台直接输出
  // 其实是输出到了当前page对象的控制台，需要通过事件监听再次打印出来
  page.on('console', msg => {
    // console.log('====msg', msg);
  });
  page.on('pageerror', async err => {
    logger.warn({ err }, '页面pageerror崩溃');
  });
  page.on('error', async err => {
    logger.warn({ err }, '页面error崩溃');
    await closePage(page);
  });
  page.on('dialog', async dialog => {
    try {
      await dialog.dismiss();
    } catch (err) {
      logger.warn({ err }, '取消页面弹窗出现异常');
    }
    try {
      dialog && await dialog.accept();
    } catch (err) {
      logger.warn({ err }, '确定页面弹窗出现异常');
    }
  });
};
