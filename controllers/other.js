
const LogModel = require('../modules/log.js')

class LogController {
    static async findAll(ctx) {
        let req = ctx.request.body;
        try {     
            let logsure = await LogModel.findAll(req);
            let total= await  LogModel.queryTotal(req);
            if (logsure) {
                ctx.response.status = 200;
                ctx.body = {
                code: 200,
                   data: logsure,
                   total
                }
            }
        } catch (err) {
            ctx.response.status = 200;
            ctx.body = {
                code: 401,
                des: '查找日志失败',
                data: err
            }

        }


    }
}
module.exports = LogController