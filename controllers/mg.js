const PersionModel = require('../modules/mgdb.js')

class MgController {
    static async save(ctx) {
        let req = ctx.request.body;
        console.log("打印请求",req);
        try {
             
            const persion = await PersionModel.creatPerson(req);
            console.log("测试元素",persion)

            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                msg: '保存用户成功',
                data: persion
            }
        } catch (err) {
            ctx.response.status = 200;
            ctx.body = {
                code: 401,
                msg: '保存信息异常',
                data: err
            }

        }


    }
    static async updata(ctx) {
        let req = ctx.request.body;
        if (req.name) {
            try {
               
                const persion = await PersionModel.updataPerson(req);

                console.log("尝试进行更新1",persion);


                if (persion) {
                    ctx.response.status = 200;
                    ctx.body = {
                        code: 200,
                        msg: persion,
                    }
                }
            } catch (err) {
                ctx.response.status = 200;
                ctx.body = {
                    code: 401,
                    msg: '保存信息异常',
                    data: err
                }

            }

        } else {
            ctx.response.status = 200;
            ctx.body = {
                code: 401,
                msg: '查缺少参数',
                data: persion
            }
        }


    }
}
module.exports = MgController