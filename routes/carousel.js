const Router = require('koa-router');
const router = new Router({prefix: '/carousel'});
const carouselController = require('../controllers/carousel');

//密码登陆
router.post('/create', carouselController.create)

router.post('/findAll', carouselController.findAll)


router.post('/update', carouselController.updata)

router.post('/del', carouselController.del)

router.post('/batchDel',carouselController.batchDel)

router.post('/queryCarousel',carouselController.queryCarousel)



module.exports = router