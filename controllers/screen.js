
const screenModel = require('../modules/screen.js');

const ComponentModel = require('../modules/component.js');

const TargetModel = require('../modules/target.js');



const {prod_config} = require("../util/chart_option.js")

class screenController {


    // 创建大屏
    static async create(ctx) {


        let req = ctx.request.body;
        try {
           
            const data = await screenModel.create(req);

           
        
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                msg: '创建大屏成功',
                data
            }
        } catch (err) {
            ctx.response.status = 416;
            ctx.body = {
                code: 416 ,
                msg: '创建大屏失败',
                data: err
            }

        }


    }

    // 修改大屏

    static async update(ctx) {
        let req = ctx.request.body;
        try {
             
            let data = await screenModel.update(req);
           
        
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                msg: '修改大屏成功',
                data
            }
        } catch (err) {
            ctx.response.status = 416;
            ctx.body = {
                code: 416 ,
                msg: '修改大屏失败',
                data: err
            }

        }


    }

    // 删除大屏

    static async del(ctx) {
        let req = ctx.request.body;
        try {
             
            const data = await screenModel.del(req.id);
        
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                msg: '删除大屏成功',
                data
            }
        } catch (err) {
            ctx.response.status = 416;
            ctx.body = {
                code: 416 ,
                msg: '删除大屏失败',
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
                //创建大屏模型
                const data=await screenModel.bacthDel(req.batchList);
                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    articleType:data,
                    des: '批量删除大屏类别成功',
                }
            } catch (err) {
                ctx.response.status = 412;
                ctx.body = {
                    code: 412,
                    msg: '批量删除大屏类别失败',
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
            let  data = await screenModel.findAll(req);
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                msg: '查找大屏成功',
                data
            }
        } catch (err) {
            ctx.response.status = 416;
            ctx.body = {
                code: 416 ,
                msg: '查找大屏失败',
                data: err
            }

        }


    }

    


    static async findAllScreen(ctx) {

        let req = ctx.request.body;
        
        try {
            let  data = await screenModel.findAllScreen(req);
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                msg: '查找所有大屏成功',
                data
            }
        } catch (err) {
            ctx.response.status = 416;
            ctx.body = {
                code: 416 ,
                msg: '查找所有大屏失败',
                data: err
            }

        }


    }

    // 查找大屏详情

    static async findOne(ctx) {
        let req = ctx.request.body;
        try {
            let  data = await screenModel.getDetail(req.id);
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                msg: '查找大屏详情成功',
                data
            }
        } catch (err) {
            ctx.response.status = 416;
            ctx.body = {
                code: 416 ,
                msg: '查找大屏详情失败',
                data: err
            }

        }


    }


    static async prod_option(ctx) {
        let req = ctx.request.body;

          // 折线图 [{"x":"洪山区","y":"11"}]; 1

        let componet = await ComponentModel.getDetail(req.componet_id);

        let tagert = await TargetModel.getDetail(req.target_id);

        let title = req.title;

        let targetNames = req.targetNames;

    




        

         let type,content,option;

         type=componet.component_type.categoryName;

         content=tagert.content;

         option= componet.option;

        

        let Prod_config = new prod_config(type,content,option,title,targetNames);

        await Prod_config.handleTarget();

        let data =await Prod_config.prod();



            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                msg: '查找大屏详情成功',
                data
            }



        // try {
        //     let  data = await screenModel.getDetail(req.id);
        //     ctx.response.status = 200;
        //     ctx.body = {
        //         code: 200,
        //         msg: '查找大屏详情成功',
        //         data
        //     }
        // } catch (err) {
        //     ctx.response.status = 416;
        //     ctx.body = {
        //         code: 416 ,
        //         msg: '查找大屏详情失败',
        //         data: err
        //     }

        // }


    }
    // 折线图 [{"x":"洪山区","y":"11"}]

}
module.exports = screenController