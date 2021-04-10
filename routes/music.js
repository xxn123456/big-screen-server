const Router = require('koa-router');
const router = new Router({prefix: '/music'});
const musicController = require('../controllers/music');

const multer = require('koa-multer');

// 上传文章图片
var storage = multer.diskStorage({
  //文件保存路径
  destination: function (req, file, cb) {
    cb(null, 'public/images/article/')
  },
  //修改文件名称
  filename: function (req, file, cb) {
    var fileFormat = (file.originalname).split(".");
    cb(null,Date.now() + "." + fileFormat[fileFormat.length - 1]);
  }
})



var upload = multer({ storage: storage });

// 上传文章图片
router.post('/upload',upload.single('file'), async (ctx, next) => {
    try{
       ctx.response.status = 200;
         ctx.body = {
           code:200,
           url: '/music/'+ctx.req.file.filename,
           des: "音频文件上传成功"
         }
    } catch(err){
       ctx.response.status = 416;
         ctx.body = {
           code:416,
           des: "音频文件上传失败",
           data:err
         }

    }
  
   })
 



//密码登陆
router.post('/create',musicController.create)

router.post('/update',musicController.update)

router.post('/del',musicController.del)

router.post('/findAll',musicController.findAll)


module.exports = router


