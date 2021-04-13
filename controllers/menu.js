const menuModel = require('../modules/menu.js')

class menuController {


    // 创建菜单
    static async create(ctx) {


        let req = ctx.request.body;
        try {
           
            const data = await menuModel.create(req);

        
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                msg: '创建菜单成功',
                data
            }
        } catch (err) {
            ctx.response.status = 416;
            ctx.body = {
                code: 416 ,
                msg: '创建菜单失败',
                data: err
            }

        }


    }

    // 修改菜单

    static async update(ctx) {
        let req = ctx.request.body;
        try {
             
            console.log("开始修改");
            let data = await menuModel.update(req);

            console.log("修改得到数据".data)
           
    
        
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                msg: '修改菜单成功',
                data
            }
        } catch (err) {
            ctx.response.status = 416;
            ctx.body = {
                code: 416 ,
                msg: '修改菜单失败',
                data: err
            }

        }


    }

    // 删除菜单

    static async del(ctx) {
        let req = ctx.request.body;
        try {
             
            const data = await menuModel.del(req.id);
        
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                msg: '删除菜单成功',
                data
            }
        } catch (err) {
            ctx.response.status = 416;
            ctx.body = {
                code: 416 ,
                msg: '删除菜单失败',
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
                //创建菜单模型
                const data=await menuModel.bacthDel(req.batchList);
                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    articleType:data,
                    des: '批量删除菜单类别成功',
                }
            } catch (err) {
                ctx.response.status = 412;
                ctx.body = {
                    code: 412,
                    msg: '批量删除菜单类别失败',
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
            let  data = await menuModel.findAll(req);

           
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                msg: '查找菜单成功',
                data
            }
        } catch (err) {
            ctx.response.status = 416;
            ctx.body = {
                code: 416 ,
                msg: '查找菜单失败',
                data: err
            }

        }


    }

   

    static async findAllMenu(ctx) {
        let req = ctx.request.body;
      
        try {
            let  data = await menuModel.findAllMenu(req);

           
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                msg: '查找所有菜单成功',
                data
            }
        } catch (err) {
            ctx.response.status = 416;
            ctx.body = {
                code: 416 ,
                msg: '查找所有菜单失败',
                data: err
            }

        }


    }

    // 查找菜单详情

    static async findOne(ctx) {
        let req = ctx.request.body;
        try {
            let  data = await menuModel.detail(req.id);
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                msg: '查找菜单详情成功',
                data
            }
        } catch (err) {
            ctx.response.status = 416;
            ctx.body = {
                code: 416 ,
                msg: '查找菜单详情失败',
                data: err
            }

        }


    }

}
module.exports = menuController