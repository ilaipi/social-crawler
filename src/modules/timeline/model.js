/**
 * user post
 */
module.exports = function (Schema) {
  const UserPostSchema = new Schema({
    urlImage: {
      type: [String],
      comment: '图片链接',
      remark: '转存到七牛的链接'
    },
    urlImageSrc: {
      type: [String],
      comment: '图片原始链接'
    },
    type: {
      type: String,
      comment: '类型'
    },
    video: {
      type: [String],
      comment: '视频链接',
      remark: '转存到七牛的链接'
    },
    videoSrc: {
      type: [String],
      comment: '视频链接',
      remark: '视频原始链接'
    },
    uri: {
      type: String,
      comment: '访问地址',
      remark: '唯一值'
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
  return ['UserPost', UserPostSchema];
};
