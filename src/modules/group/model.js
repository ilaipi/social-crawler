/**
 * 平台
 * 比如詹密团
 */
module.exports = function (Schema) {
  const GroupSchema = new Schema({
    originId: {
      type: String,
      comment: '原始id'
    },
    name: {
      type: String,
      comment: '小程序名字'
    },
    qrcode: {
      type: String,
      comment: '小程序二维码'
    },
    logo: {
      type: String,
      ref: '小程序logo'
    }
  });
  return ['Group', GroupSchema];
};
