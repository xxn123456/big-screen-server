const Router = require('koa-router');
const router = new Router({prefix: '/user'});
const userController = require('../controllers/user');

const multer = require('koa-multer');
// 创建文章类别

// 上传文章图片
var storage = multer.diskStorage({

    //文件保存路径
    destination: function (req, file, cb) {
        cb(null, 'public/img/user/')
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


//密码登陆
router.post('/login', userController.login)

router.post('/update', userController.update)


router.post('/regist', userController.create)


router.post('/del', userController.delUser)


router.post('/findAll', userController.findAll)


router.post('/upload', upload.single('file'), async (ctx, next) => {
    try {
        ctx.response.status = 200;
        ctx.body = {
            code: 200,
            url: '/images/img/user/' + ctx.req.file.filename,
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









//获取用户信息
router.get('/getUserInfo', userController.getUserInfo)



module.exports = router


