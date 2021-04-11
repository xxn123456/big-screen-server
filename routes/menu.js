const Router = require('koa-router');
const router = new Router({prefix: '/menu'});
const menuController= require('../controllers/menu.js');

// 创建文章类别

router.post('/create', menuController.create)
router.post('/findAll', menuController.findAll)

router.post('/updata', menuController.update)

router.post('/del', menuController.del)

router.post('/batchDel', menuController.batchDel)

module.exports = router