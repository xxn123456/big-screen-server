const Router = require('koa-router');
const router = new Router({prefix: '/mysqlsource'});
const sourceController = require('../controllers/source_mysql.js');

//密码登陆
router.post('/create', sourceController.create)

router.post('/findAll', sourceController.findAll)


router.post('/update', sourceController.update)

router.post('/del', sourceController.del)

router.post('/batchDel',sourceController.batchDel)



module.exports = router