const Router = require('koa-router');
const router = new Router({prefix: '/component'});
const 




componentController= require('../controllers/component.js');

// 创建文章类别

router.post('/create', componentController.create)
router.post('/findAll', componentController.findAll)

router.post('/updata', componentController.update)

router.post('/del', componentController.del)

router.post('/batchDel', componentController.batchDel)

module.exports = router