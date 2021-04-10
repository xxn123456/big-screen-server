const indexRouter = require('./index');
const userRouter =require('./user');
const articleTypeRouter = require('./articleType.js');
const blogRouter=require('./blog.js');

const uploadRouter = require('./upload.js')

const carouselRouter = require('./carousel.js')

const musicRouter  = require('./music.js')


const wxRouter = require('./wxLogin.js')

const source_mysqlRouter = require('./source_mysql.js')


const targetRouter = require('./target.js')



module.exports={
    indexRouter,
    userRouter,
    articleTypeRouter,
    blogRouter,
    uploadRouter,
    carouselRouter,
    musicRouter,
    wxRouter,
    source_mysqlRouter,
    targetRouter
}