const mysqlModel = require('../modules/source_mysql.js')

class mysqlController {


    // 创建数据源
    static async create(ctx) {


        let req = ctx.request.body;
        try {
             
            const data = await mysqlModel.create(req);
        
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                msg: '创建数据源成功',
                data
            }
        } catch (err) {
            ctx.response.status = 416;
            ctx.body = {
                code: 416 ,
                msg: '创建数据源失败',
                data: err
            }

        }


    }

    // 修改数据源

    static async update(ctx) {
        let req = ctx.request.body;
        try {
             
            let ret = await mysqlModel.update(req);
           
            let blogDetail =await mysqlModel.detail(req.id);
        
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                msg: '修改数据源成功',
                data: blogDetail
            }
        } catch (err) {
            ctx.response.status = 416;
            ctx.body = {
                code: 416 ,
                msg: '修改数据源失败',
                data: err
            }

        }


    }

    // 删除数据源

    static async del(ctx) {
        let req = ctx.request.body;
        try {
             
            const data = await mysqlModel.del(req.id);
        
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                msg: '删除数据源成功',
                data
            }
        } catch (err) {
            ctx.response.status = 416;
            ctx.body = {
                code: 416 ,
                msg: '删除数据源失败',
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
                //创建数据源模型
                const data=await mysqlModel.bacthDel(req.batchList);
                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    articleType:data,
                    des: '批量删除数据源类别成功',
                }
            } catch (err) {
                ctx.response.status = 412;
                ctx.body = {
                    code: 412,
                    msg: '批量删除数据源类别失败',
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

        let  data = await mysqlModel.findAll(req);
        ctx.response.status = 200;
        ctx.body = {
            code: 200,
            msg: '查找数据源成功',
            data
        }

      
        // try {
        //     let  data = await mysqlModel.finAll(req);
        //     ctx.response.status = 200;
        //     ctx.body = {
        //         code: 200,
        //         msg: '查找数据源成功',
        //         data
        //     }
        // } catch (err) {
        //     ctx.response.status = 416;
        //     ctx.body = {
        //         code: 416 ,
        //         msg: '查找数据源失败',
        //         data: err
        //     }

        // }


    }

    // 查找数据源详情

    static async findOne(ctx) {
        let req = ctx.request.body;
        try {
            let  data = await mysqlModel.detail(req.id);
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                msg: '查找数据源详情成功',
                data
            }
        } catch (err) {
            ctx.response.status = 416;
            ctx.body = {
                code: 416 ,
                msg: '查找数据源详情失败',
                data: err
            }

        }


    }

}
module.exports = mysqlController