const Router = require('koa-router');
const router = new Router({prefix: '/targetType'});
const target_typeController = require('../controllers/target_type.js');

//密码登陆
router.post('/create', target_typeController.create)

router.post('/findAll', target_typeController.findAll)


router.post('/update', target_typeController.update)

router.post('/del', target_typeController.del)

router.post('/batchDel',target_typeController.batchDel)

router.get('/findAllSoureType', target_typeController.findAllSoureType)






module.exports = router