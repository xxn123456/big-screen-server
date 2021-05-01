const Router = require('koa-router');
const router = new Router({prefix: '/resourceLimit'});
const resourceLimitController= require('../controllers/resource_limit.js');

// 创建文章类别

router.post('/create', resourceLimitController.create)
router.post('/findAll', resourceLimitController.findAll)

router.post('/updata', resourceLimitController.update)

router.post('/del', resourceLimitController.del)

router.post('/batchDel', resourceLimitController.batchDel)

module.exports = router