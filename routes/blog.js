const Router = require('koa-router');
const router = new Router({prefix: '/blog'});
const blogController = require('../controllers/blog');

const multer = require('koa-multer');

// 上传文章图片
var storage = multer.diskStorage({
  //文件保存路径
  destination: function (req, file, cb) {
    cb(null, 'public/images/book/')
  },
  //修改文件名称
  filename: function (req, file, cb) {
    var fileFormat = (file.originalname).split(".");
    cb(null,Date.now() + "." + fileFormat[fileFormat.length - 1]);
  }
})
//加载配置
var upload = multer({ storage: storage });

router.post('/upBook',upload.single('book'), async (ctx, next) => {
    try{
       ctx.response.status = 200;
         ctx.body = {
           code:200,
           url: '/images/book/'+ctx.req.file.filename,
           des: "封面上传成功"
         }
    } catch(err){
       ctx.response.status = 416;
         ctx.body = {
           code:416,
           des: "封面上传失败",
           data:err
         }

    }
  
   })
//密码登陆
router.post('/create',blogController.create)

router.post('/findAll', blogController.findAll)

router.post('/findOne', blogController.findOne)

router.post('/update', blogController.update)

router.post('/del', blogController.del)

router.post('/batchDel',blogController.batchDel)

module.exports = router