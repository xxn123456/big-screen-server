const Router = require('koa-router');
const router = new Router({prefix: '/user'});
const userController = require('../controllers/user');

//密码登陆
router.post('/login', userController.login)


router.post('/regist', userController.create)


router.post('/del', userController.delUser)


router.post('/findAll', userController.findAll)






//获取用户信息
router.get('/getUserInfo', userController.getUserInfo)



module.exports = router


