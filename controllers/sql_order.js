const mysqlModel = require('../modules/BaseSql/source_mysql.js');

class sqlController {
    // 查询表结构
    static async query_table(ctx) {


        let req = ctx.request.body;


        try {

            const data = await mysqlModel.query_table(req);

            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                msg: '查询表结构成功',
                data
            }
        } catch (err) {
            ctx.response.status = 416;
            ctx.body = {
                code: 416,
                msg: '查询失败',
                data: err
            }

        }

    }

    // 查询指标

    static async query_mysql(ctx) {


        let req = ctx.request.body;


        try {

            const data = await mysqlModel.query_mysql(req);

            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                msg: '数据库查询指标成功',
                data
            }
        } catch (err) {
            ctx.response.status = 416;
            ctx.body = {
                code: 416,
                msg: '数据库查询指标失败',
                data: err
            }

        }


    }


    static async conect_mysql(ctx) {


        let req = ctx.request.body;


        try {

            const data = await mysqlModel.conect_mysql(req);

            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                msg: '数据库连接成功',
                data
            }
        } catch (err) {
            ctx.response.status = 416;
            ctx.body = {
                code: 416,
                msg: '数据库连接失败',
                data: err
            }

        }


    }



}

module.exports = sqlController