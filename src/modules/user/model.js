/**
 * 用户
 * 读取微信信息
 */
module.exports = function (Schema) {
  const UserSchema = new Schema({
    name: {
      type: String,
      comment: '昵称',
      remark: '微信昵称'
    },
    avatar: {
      type: String,
      comment: '头像',
      remark: '默认是微信头像'
    },
    sex: {
      type: Number,
      comment: '性别',
      enum: [
        1, // 男
        2 // 女
      ]
    },
    province: {
      type: String,
      comment: '省份'
    },
    city: {
      type: String,
      comment: '市区'
    },
    openid: {
      type: String,
      comment: '微信身份'
    },
    date: {
      type: Date,
      comment: '授权时间'
    }
  });
  return ['User', UserSchema];
};
