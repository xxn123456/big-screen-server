const {
  Schema
} = require('../config/coon');
const mongoose = require('../config/coon');

var moment = require('moment'); 
let musicSchema = new mongoose.Schema({
  author: String,
  name: String,
  url: String,
  createdAt:{
    type: String,
    default: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
  }
 ,
  // 更新时间
  updatedAt: {
    type: String,
    default: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
  }
})


// 挂载静态方法

musicSchema.statics.findByName = function (name, cb) {
  return this.find({
    "name": name
  }, cb)
}

const Music = mongoose.model('music', musicSchema, 'music')

module.exports = Music