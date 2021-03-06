const resourceLimitModel = require('../modules/resource_limit.js')

class resourceLimitController {


    // 创建组件类别
    static async create(ctx) {


        let req = ctx.request.body;
        try {
           
            const data = await resourceLimitModel.create(req);

           
        
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                msg: '创建组件类别成功',
                data
            }
        } catch (err) {
            ctx.response.status = 416;
            ctx.body = {
                code: 416 ,
                msg: '创建组件类别失败',
                data: err
            }

        }


    }

    // 修改组件类别

    static async update(ctx) {
        let req = ctx.request.body;
        try {
             
            let ret = await resourceLimitModel.update(req);
           
            let blogDetail =await resourceLimitModel.detail(req.id);
        
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                msg: '修改组件类别成功',
                data: blogDetail
            }
        } catch (err) {
            ctx.response.status = 416;
            ctx.body = {
                code: 416 ,
                msg: '修改组件类别失败',
                data: err
            }

        }


    }

    // 删除组件类别

    static async del(ctx) {
        let req = ctx.request.body;
        try {
             
            const data = await resourceLimitModel.del(req.id);
        
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                msg: '删除组件类别成功',
                data
            }
        } catch (err) {
            ctx.response.status = 416;
            ctx.body = {
                code: 416 ,
                msg: '删除组件类别失败',
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
                //创建组件类别模型
                const data=await resourceLimitModel.bacthDel(req.batchList);
                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    articleType:data,
                    des: '批量删除组件类别类别成功',
                }
            } catch (err) {
                ctx.response.status = 412;
                ctx.body = {
                    code: 412,
                    msg: '批量删除组件类别类别失败',
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

        let  data = await resourceLimitModel.findAll(req);
        ctx.response.status = 200;
        ctx.body = {
            code: 200,
            msg: '查找组件类别成功',
            data
        }

      
        // try {
        //     let  data = await resourceLimitModel.finAll(req);
        //     ctx.response.status = 200;
        //     ctx.body = {
        //         code: 200,
        //         msg: '查找组件类别成功',
        //         data
        //     }
        // } catch (err) {
        //     ctx.response.status = 416;
        //     ctx.body = {
        //         code: 416 ,
        //         msg: '查找组件类别失败',
        //         data: err
        //     }

        // }


    }

    // 查找组件类别详情

    static async findOne(ctx) {
        let req = ctx.request.body;
        try {
            let  data = await resourceLimitModel.detail(req.id);
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                msg: '查找组件类别详情成功',
                data
            }
        } catch (err) {
            ctx.response.status = 416;
            ctx.body = {
                code: 416 ,
                msg: '查找组件类别详情失败',
                data: err
            }

        }


    }

}
module.exports =resourceLimitController