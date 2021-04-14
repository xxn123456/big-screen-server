const Router = require('koa-router');
const router = new Router({prefix: '/sourceType'});
const source_typeController = require('../controllers/source_type.js');

//密码登陆
router.post('/create', source_typeController.create)

router.post('/findAll', source_typeController.findAll)


router.post('/update', source_typeController.update)

router.post('/findOne',source_typeController.findOne)

router.post('/del', source_typeController.del)

router.post('/batchDel',source_typeController.batchDel)

router.get('/findAllSoureType', source_typeController.findAllSoureType)






module.exports = router