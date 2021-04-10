const router = require('koa-router')()


const articleTypeController = require('../controllers/test.js');

// 创建文章类别

router.post('/test', articleTypeController.findAll)


module.exports = router
