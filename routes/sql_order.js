const Router = require('koa-router');
const router = new Router({prefix: '/sql'});
const sqlController = require('../controllers/sql_order.js');


// 查询表头

router.post('/queryTable',sqlController.query_table)

// 查询表数据

router.post('/queryMysql',sqlController.query_mysql)

// 连接测试

router.post('/conectMysql',sqlController.conect_mysql)













module.exports = router