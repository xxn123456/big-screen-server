const Router = require('koa-router');
const router = new Router({prefix: '/target'});
const targetController = require('../controllers/target.js');

//密码登陆
router.post('/create', targetController.create)

router.post('/findAll', targetController.findAll)


router.post('/update', targetController.update)

router.post('/del', targetController.del)

router.post('/batchDel',targetController.batchDel)

// 数据库从操作


// 查询表头

router.post('/queryTable',targetController.query_table)

// 查询表数据

router.post('/queryMysql',targetController.query_mysql)

// 连接测试

router.post('/conectMysql',targetController.conect_mysql)













module.exports = router