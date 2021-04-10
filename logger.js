let logconfig = {
    des: ""
}

const logModule = require("./modules/log")

const logger = async(ctx, next) => {
    let start = new Date();

   

    let ms = new Date() - start;
  
   

    logconfig.des = JSON.stringify(ctx.request.body);


    let sure={
        nickname:ctx.session.userInfo,
        url:ctx.url,
        method:ctx.method,
        desc:logconfig.des,
        host:ctx.headers['x-forwarded-for'] || ctx.headers['x-real-ip'],
        answer:ms
    }

    console.log("无法响应")

  


    logModule.add(sure);

    await next();


    

    
  
    // console.log('开始'+ ctx.session.userInfo);
    // console.log(logconfig.des);
    // console.log('结束'+`${ctx.method} ${ctx.url} - ${ms}ms - ${ctx.request.body}`)

    
}

module.exports = { logger, logconfig }