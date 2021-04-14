const targetModel = require('../modules/target.js');


class targetController {

     // 查询表结构
     static async query_table(ctx) {


        let req = ctx.request.body;


        try {

            const data = await targetModel.query_table(req);

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

            const data = await targetModel.query_mysql(req);

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

            const data = await targetModel.conect_mysql(req);

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



    

    // 创建指标
    static async create(ctx) {
        let req = ctx.request.body;
        try {

            let data = await targetModel.create(req);

            let msg = await targetModel.getDetail(data.id);

            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                msg: '创建指标成功',
                msg
            }
        } catch (err) {
            ctx.response.status = 416;
            ctx.body = {
                code: 416,
                msg: '创建指标失败',
                data: err
            }

        }


    }

    // 修改指标

    static async update(ctx) {
        let req = ctx.request.body;
        try {

            let ret = await targetModel.update(req);

            let blogDetail = await targetModel.detail(req.id);

            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                msg: '修改指标成功',
                data: blogDetail
            }
        } catch (err) {
            ctx.response.status = 416;
            ctx.body = {
                code: 416,
                msg: '修改指标失败',
                data: err
            }

        }


    }

    // 删除指标

    static async del(ctx) {
        let req = ctx.request.body;
        try {

            const data = await targetModel.del(req.id);

            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                msg: '删除指标成功',
                data
            }
        } catch (err) {
            ctx.response.status = 416;
            ctx.body = {
                code: 416,
                msg: '删除指标失败',
                data: err
            }

        }


    }

    // 批量删除

    static async batchDel(ctx) {
        //接收客服端
        let req = ctx.request.body;
        if (req.batchList) {
            try {
                //创建指标模型
                const data = await targetModel.bacthDel(req.batchList);
                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    articleType: data,
                    des: '批量删除指标类别成功',
                }
            } catch (err) {
                ctx.response.status = 412;
                ctx.body = {
                    code: 412,
                    msg: '批量删除指标类别失败',
                    des: err
                }
            }
        } else {
            ctx.response.status = 416;
            ctx.body = {
                code: 200,
                msg: '类别id不能为空'
            }
        }
    }

    // 分页

    static async findAll(ctx) {
        let req = ctx.request.body;

        let data = await targetModel.findAll(req);

    


        ctx.response.status = 200;
        ctx.body = {
            code: 200,
            msg: '查找指标成功',
            data
        }


        // try {
        //     let  data = await targetModel.finAll(req);
        //     ctx.response.status = 200;
        //     ctx.body = {
        //         code: 200,
        //         msg: '查找指标成功',
        //         data
        //     }
        // } catch (err) {
        //     ctx.response.status = 416;
        //     ctx.body = {
        //         code: 416 ,
        //         msg: '查找指标失败',
        //         data: err
        //     }

        // }


    }

    // 查找指标详情

    static async findOne(ctx) {
        let req = ctx.request.body;
        try {
            let data = await targetModel.detail(req.id);
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                msg: '查找指标详情成功',
                data
            }
        } catch (err) {
            ctx.response.status = 416;
            ctx.body = {
                code: 416,
                msg: '查找指标详情失败',
                data: err
            }

        }


    }

}
module.exports = targetController