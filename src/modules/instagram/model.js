/**
 * INS post
 */
module.exports = function (Schema) {
  const INSPostSchema = new Schema({
    urlImage: {
      type: [String],
      comment: '图片链接',
      remark: '转存到七牛的链接'
    },
    urlImageSrc: {
      type: [String],
      comment: '图片原始链接'
    },
    isVideo: {
      type: Boolean,
      comment: '密码'
    },
    video: {
      type: String,
      comment: '视频链接',
      remark: '转存到七牛的链接'
    },
    videoSrc: {
      type: String,
      comment: '视频链接',
      remark: '转存到七牛的链接'
    },
    city: {
      type: Schema.Types.ObjectId,
      ref: 'District',
      comment: '注册城市'
    },
    name: {
      type: String,
      comment: '微信昵称'
    },
    avatar: {
      type: String,
      comment: '头像'
    },
    sex: {
      type: Number,
      comment: '性别',
      enum: [
        1, // 男
        2, // 女
        9 // 未知
      ]
    },
    title: {
      type: String,
      comment: '职称'
    },
    hospital: {
      type: Schema.Types.ObjectId,
      ref: 'Hospital',
      comment: '医院'
    },
    department: {
      type: Schema.Types.ObjectId,
      ref: 'Department',
      comment: '科室'
    }
  });
  return ['INSPost', INSPostSchema];
};
