const Router = require('koa-router');
const router = new Router({prefix: '/screen'});
const screenController= require('../controllers/screen.js');


const multer = require('koa-multer');
// 创建文章类别

// 上传文章图片
var storage = multer.diskStorage({

    //文件保存路径
    destination: function (req, file, cb) {
        cb(null, 'public/img/screen/')
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

router.post('/create', screenController.create)
router.post('/findAll', screenController.findAll)
router.post('/findOne', screenController.findOne)
router.get('/findAllScreen', screenController.findAllScreen)

router.post('/update', screenController.update)

router.post('/del', screenController.del)

router.post('/batchDel', screenController.batchDel)

router.post('/prod_option', screenController.prod_option)



router.post('/upload', upload.single('file'), async (ctx, next) => {
    try {
        ctx.response.status = 200;
        ctx.body = {
            code: 200,
            url: '/images/img/screen/' + ctx.req.file.filename,
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