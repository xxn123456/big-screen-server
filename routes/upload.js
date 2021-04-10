const Router = require('koa-router');
const router = new Router({prefix: '/upload'});

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
//加载配置
var upload = multer({ storage: storage });


// 上传轮播图片
var storageCarouse = multer.diskStorage({
      //文件保存路径
      destination: function (req, file, cb) {
        cb(null, 'public/images/carousel/')
      },
      //修改文件名称
      filename: function (req, file, cb) {
        var fileFormat = (file.originalname).split(".");
        cb(null,Date.now() + "." + fileFormat[fileFormat.length - 1]);
      }
    })

var carouselUp =multer({ storage: storageCarouse })


// 上传文章图片
router.post('/articleImg',upload.single('articleImg'), async (ctx, next) => {
     try{
        ctx.response.status = 200;
          ctx.body = {
            code:200,
            url: '/images/article/'+ctx.req.file.filename,
            des: "文章图片上传成功"
          }
     } catch(err){
        ctx.response.status = 416;
          ctx.body = {
            code:416,
            des: "文章图片上传失败",
            data:err
          }

     }
   
    })

// 上传广告轮播图片
router.post('/carousel',carouselUp.single('file'), async (ctx, next) => {
        try{
           ctx.response.status = 200;
             ctx.body = {
               code:200,
               url: '/images/carousel/'+ctx.req.file.filename,
               des: "轮播上传成功"
             }
        } catch(err){
           ctx.response.status = 416;
             ctx.body = {
               code:416,
               des: "轮播上传失败",
               data:err
             }
   
        }
      
       })
module.exports = router


