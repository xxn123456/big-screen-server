const Router = require('koa-router');
const router = new Router({prefix: '/componentType'});
const 




componentTypeController= require('../controllers/component_type.js');

// 创建文章类别

router.post('/create', componentTypeController.create)
router.post('/findAll', componentTypeController.findAll)

router.post('/updata', componentTypeController.update)

router.post('/del', componentTypeController.del)

router.post('/batchDel', componentTypeController.batchDel)

module.exports = router