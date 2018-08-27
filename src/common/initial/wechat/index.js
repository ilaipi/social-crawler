import mongoose from 'mongoose';
import { forEach } from 'lodash';

import api from './api';
import bot from './bot';

const init = async () => {
  const WechatAccount = mongoose.model('WechatAccount');
  const accounts = await WechatAccount.find();
  forEach(accounts, async (account) => {
    await api(account);
    await bot(account);
  });
};

export default init;
