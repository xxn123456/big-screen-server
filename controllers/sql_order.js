const mysqlModel = require('../modules/BaseSql/source_mysql.js');

const Source = require('../modules/source.js')



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

        let source = await Source.getDetail(req.source_config);

        let opt = {
            host: source.host,
            port: source.port,
            user: source.sql_user,
            password: source.sql_pass,
            database: source.title,
            time_zone:source.time_zone,
            useConnectionPooling: true,
        };
        let sql = req.sql_order;
        try {

            const data = await mysqlModel.query_mysql(opt,sql);

            console.log("查询出来的结果",data)

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