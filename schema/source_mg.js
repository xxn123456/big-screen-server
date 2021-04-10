const {
    Schema
} = require('../config/coon');
const mongoose = require('../config/coon');
var moment = require('moment');
let source_mg = new mongoose.Schema({
    //连接名称
    title: {
        type: STRING,
        allowNull: false
    },
    // 数据库用户名
    sql_user: {
        type: STRING,
        allowNull: false
    },
    // 数据库密码
    sql_pass: {
        type: STRING,
        allowNull: false
    },
    // 链接网址
    host: {
        type: STRING,
        allowNull: false
    },
    // 端口
    port: {
        type: INTEGER,
        allowNull: false
    },
    // 时区配置
    time_zone: {
        type: STRING,
        allowNull: false
    },
    createdAt: {
        type: String,
        default: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    },
    // 更新时间
    updatedAt: {
        type: String,
        default: moment(new Date()).format('YYYY-MM-DD HH:mm:ss')
    }

})
const Source_mg = mongoose.model('source_mg', source_mg, 'source_mg')

module.exports = Source_mg