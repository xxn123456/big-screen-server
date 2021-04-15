const Router = require('koa-router');
const router = new Router({prefix: '/target'});
const targetController = require('../controllers/target.js');

//密码登陆
router.post('/create', targetController.create)

router.post('/findAll', targetController.findAll)


router.post('/update', targetController.update)

router.post('/del', targetController.del)

router.post('/batchDel',targetController.batchDel)















module.exports = router