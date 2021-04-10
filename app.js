const Koa = require('koa')
const app = new Koa()
const views = require('koa-views')
const json = require('koa-json')
const onerror = require('koa-onerror')
const bodyparser = require('koa-bodyparser')

const session = require('koa-session')



// ---------使用session
const CONFIG = {
    key: 'koa:sess',
    /** (string) cookie key (default is koa:sess) cookie 的Name */
    /** (number || 'session') maxAge in ms (default is 1 days) */
    /** 'session' will result in a cookie that expires when session/browser is closed */
    /** Warning: If a session cookie is stolen, this cookie will never expire */
    maxAge: 1000 * 60 * 60,
    /** cookie 的过期时间 */
    autoCommit: true,
    /** (boolean) automatically commit headers (default true) */
    overwrite: true,
    /** (boolean) can overwrite or not (default true) */
    httpOnly: true,
    /** (boolean) httpOnly or not (default true) */
    signed: true,
    /** (boolean) signed or not (default true) */
    rolling: false,
    /** (boolean) Force a session identifier cookie to be set on every response. The expiration is reset to the original maxAge, resetting the expiration countdown. (default is false) */
    renew: false,
    // store,
    /** (boolean) renew session when session is nearly expired, so we can always keep user logged in. (default is false)*/
}
app.keys = ['login secret'] // 加密密钥
app.use(session(CONFIG, app));

// -----------

const logger = require('koa-logger')
const Moment = require("moment");
const remberLoger = require('./logger')
// 导入jwt
const koajwt = require('koa-jwt')
const cors = require('koa2-cors')

const {
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
} = require('./routes/mian.js')





onerror(app)


// middlewares
app.use(bodyparser({
    enableTypes: ['json', 'form', 'text']
}))
app.use(json())

app.use(require('koa-static')(__dirname + '/public'))

app.use(views(__dirname + '/views', {
    extension: 'pug'
}))


app.use(remberLoger.logger);



app.use(logger((str) => {
    console.log(Moment().format('YYYY-MM-DD HH:mm:ss') + str);
}))

app.use(cors());
// routes
app.use(indexRouter.routes(),indexRouter.allowedMethods());
// 导入登录路由
app.use(userRouter.routes(),userRouter.allowedMethods());
// 文章类别路由
app.use(articleTypeRouter.routes(),articleTypeRouter.allowedMethods());
// 文章路由
app.use(blogRouter.routes(),blogRouter.allowedMethods());

// 文件上传路由

app.use(uploadRouter.routes(),uploadRouter.allowedMethods());

// 轮播路由

app.use(carouselRouter.routes(),carouselRouter.allowedMethods());

// // 音乐列表路由

app.use(musicRouter.routes(),musicRouter.allowedMethods());

// // 微信登录列表

app.use(wxRouter.routes(),wxRouter.allowedMethods());




app.use(source_mysqlRouter.routes(),source_mysqlRouter.allowedMethods());



app.use(targetRouter.routes(),targetRouter.allowedMethods());















// error-handling
app.on('error', (err, ctx) => {
    console.error('server error', err, ctx)
});



// 错误拦截
app.use(async (ctx, next) => {
    return next().catch((err) => {
        if (err.status === 401) {
            ctx.status = 401;
            ctx.body = {
                code: '-2000',
                desc: '登陆过期，请重新登陆'
            };
        } else {
            throw err;
        }
    })
})
//jwt 过滤器

app.use(koajwt({
    secret: '123456'
}).unless({
    path: [/^\/user\/regist/, /^\/user\/login/, /^\/public\*/,/^\/static/]

}))
module.exports = app