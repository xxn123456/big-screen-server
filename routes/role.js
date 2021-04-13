const Router = require('koa-router');
const router = new Router({prefix: '/role'});
const roleController= require('../controllers/role.js');

// 创建文章类别

router.post('/create', roleController.create)
router.post('/findAll', roleController.findAll)

router.get('/findAllRole',roleController.findAllRole)

router.post('/update', roleController.update)

router.post('/del', roleController.del)

router.post('/batchDel', roleController.batchDel)

module.exports = router