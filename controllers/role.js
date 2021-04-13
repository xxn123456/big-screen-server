const roleModel = require('../modules/role.js')

class roleController {


    // 创建角色别
    static async create(ctx) {


        let req = ctx.request.body;
        try {
           
            const data = await roleModel.create(req);

        
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                msg: '创建角色别成功',
                data
            }
        } catch (err) {
            ctx.response.status = 416;
            ctx.body = {
                code: 416 ,
                msg: '创建角色别失败',
                data: err
            }

        }


    }

    // 修改角色别

    static async update(ctx) {
        let req = ctx.request.body;
        try {
             
            let data = await roleModel.update(req);
           
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                msg: '修改角色别成功',
                data
            }
        } catch (err) {
            ctx.response.status = 416;
            ctx.body = {
                code: 416 ,
                msg: '修改角色别失败',
                data: err
            }

        }


    }

    // 删除角色

    static async del(ctx) {
        let req = ctx.request.body;
        try {
             
            const data = await roleModel.del(req.id);
        
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                msg: '删除角色别成功',
                data
            }
        } catch (err) {
            ctx.response.status = 416;
            ctx.body = {
                code: 416 ,
                msg: '删除角色别失败',
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
                //创建角色别模型
                const data=await roleModel.bacthDel(req.batchList);
                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    articleType:data,
                    des: '批量删除角色别类别成功',
                }
            } catch (err) {
                ctx.response.status = 412;
                ctx.body = {
                    code: 412,
                    msg: '批量删除角色别类别失败',
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
        try {
            let  data = await roleModel.findAll(req);
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                msg: '查找角色别成功',
                data
            }
        } catch (err) {
            ctx.response.status = 416;
            ctx.body = {
                code: 416 ,
                msg: '查找角色别失败',
                data: err
            }

        }


    }
    // 查找角色别详情
    static async findOne(ctx) {
        let req = ctx.request.body;
        try {
            let  data = await roleModel.detail(req.id);
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                msg: '查找角色别详情成功',
                data
            }
        } catch (err) {
            ctx.response.status = 416;
            ctx.body = {
                code: 416 ,
                msg: '查找角色别详情失败',
                data: err
            }

        }


    }

      // 查询所有角色

      static async findAllRole(ctx) {
        try {
            let data = await roleModel.findAllRole();

            console.log("查询到的--------------",data)
           
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                msg: '查询所有成功',
                data
            }
        } catch (err) {
            ctx.response.status = 416;
            ctx.body = {
                code: 416 ,
                msg: '查询所有角色失败',
                data: err
            }

        }


    }

}
module.exports = roleController