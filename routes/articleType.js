const Router = require('koa-router');
const router = new Router({prefix: '/articleType'});
const articleTypeController = require('../controllers/articleType.js');

// 创建文章类别

router.post('/create', articleTypeController.create)
router.post('/findAll', articleTypeController.findAll)

router.post('/updata', articleTypeController.updata)

router.post('/del', articleTypeController.del)

router.post('/batchDel', articleTypeController.batchDel)

module.exports = router