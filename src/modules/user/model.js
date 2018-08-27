/**
 * 用户
 * 爬取用户数据时，对所有平台都保存一份，方便查询，同时每个平台的评论独立
 * 新增一个平台的时候，如果选择了已经有的用户，则把此用户的历史数据复制一份到新平台
 */
module.exports = function (Schema) {
  const UserSchema = new Schema({
    social: {
      type: String,
      comment: '社交媒体',
      enum: [
        'twitter',
        'instagram',
        'facebook'
      ]
    },
    name: {
      type: String,
      comment: '昵称'
    },
    username: {
      type: String,
      comment: '用户名'
    },
    avatar: {
      type: String,
      ref: '头像'
    },
    groups: {
      type: [Schema.Types.ObjectId],
      ref: 'Group'
    }
  });
  return ['User', UserSchema];
};
