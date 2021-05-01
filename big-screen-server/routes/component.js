const Router = require('koa-router');
const router = new Router({prefix: '/component'});
const componentController= require('../controllers/component.js');

const multer = require('koa-multer');

// 上传文章图片
var storage = multer.diskStorage({

    //文件保存路径
    destination: function (req, file, cb) {
        cb(null, 'public/img/component/')
    },
    //修改文件名称
    filename: function (req, file, cb) {
        var fileFormat = (file.originalname).split(".");
        cb(null, Date.now() + "." + fileFormat[fileFormat.length - 1]);
    }
})

var upload = multer({
    storage: storage
});


// 创建文章类别

router.post('/create', componentController.create)
router.post('/findAll', componentController.findAll)

router.post('/update', componentController.update)

router.post('/del', componentController.del)

router.post('/batchDel', componentController.batchDel)

router.get('/findComponentAndType', componentController.findComponentAndType)

router.post('/findComponentByType', componentController.findComponentByType)


router.post('/upload', upload.single('file'), async (ctx, next) => {
    try {
        ctx.response.status = 200;
        ctx.body = {
            code: 200,
            url: '/img/component/' + ctx.req.file.filename,
            des: "文章图片上传成功"
        }
    } catch (err) {
        ctx.response.status = 416;
        ctx.body = {
            code: 416,
            des: "文章图片上传失败",
            data: err
        }

    }

})



module.exports = router