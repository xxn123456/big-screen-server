const Router = require('koa-router');
const router = new Router({prefix: '/screen'});
const screenController= require('../controllers/screen.js');

// 创建文章类别

router.post('/create', screenController.create)
router.post('/findAll', screenController.findAll)

router.post('/updata', screenController.update)

router.post('/del', screenController.del)

router.post('/batchDel', screenController.batchDel)

module.exports = router