
const mongoose = require('../config/coon');

var moment = require('moment'); 
let musicSchema = new mongoose.Schema({
    nickname:String,

    method:String,

    host:String,

    url:String,
    desc:String,
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


const LogSure = mongoose.model('logSure', musicSchema, 'logSure')

module.exports = LogSure