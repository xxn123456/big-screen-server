const { assign } = require("nodemailer/lib/shared");
const CarouselModel = require("../modules/carousel");

class CarouselController {
    /**
     * 创建文章
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async create(ctx) {
        //接收客服端
        let req = ctx.request.body;
        if (req.pic) {
            try {
                let maxNum = await CarouselModel.finAll();

                if (maxNum.count > 5) {
                    ctx.response.status = 200;
                    ctx.body = {
                        code: 401,
                        des: '超过轮播图最大设置-5',
                    }

                } else {
                    //创建文章模型
                    const ret = await CarouselModel.create(req);
                    //使用刚刚创建的文章ID查询文章详情，且返回文章详情信息
                    const data = await CarouselModel.detail(ret.id);

                    ctx.response.status = 200;
                    ctx.body = {
                        code: 200,
                        data: data,
                        des: '创建轮播成功',
                    }

                }

            } catch (err) {
                ctx.response.status = 412;
                ctx.body = {
                    code: 412,
                    msg: '创建轮播失败',
                    des: err
                }
            }
        } else {
            ctx.response.status = 416;
            ctx.body = {
                code: 200,
                msg: '轮播图片不能为空'
            }
        }
    }

    static async updata(ctx) {
        //接收客服端
        let req = ctx.request.body;
        if (req.id && req.pic) {
            try {
                //创建文章模型
                await CarouselModel.upDate(req);
                const data = await CarouselModel.detail(req.id);
                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    data: data,
                    des: '更新轮播成功',
                }
            } catch (err) {
                ctx.response.status = 412;
                ctx.body = {
                    code: 412,
                    msg: '更新轮播失败',
                    des: err
                }
            }
        } else {
            ctx.response.status = 416;
            ctx.body = {
                code: 200,
                msg: '轮播id跟轮播图片不能为空'
            }
        }
    }

    // 删除文章类别

    static async del(ctx) {
        //接收客服端
        let req = ctx.request.body;
        if (req.id) {
            try {
                //创建文章模型
                const data = await CarouselModel.del(req.id);
                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    data: data,
                    des: '删除轮播成功',
                }
            } catch (err) {
                ctx.response.status = 412;
                ctx.body = {
                    code: 412,
                    msg: '删除轮播失败',
                    des: err
                }
            }
        } else {
            ctx.response.status = 416;
            ctx.body = {
                code: 200,
                msg: '轮播id不能为空'
            }
        }
    }

    // 批量删除操作

    static async batchDel(ctx) {
        //接收客服端
        let req = ctx.request.body;
        if (req.batchList) {
            try {
                //创建文章模型
                const data = await CarouselModel.bacthDel(req.batchList);
                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    data: data,
                    des: '批量删除轮播成功',
                }
            } catch (err) {
                ctx.response.status = 412;
                ctx.body = {
                    code: 412,
                    msg: '批量删除轮播失败',
                    des: err
                }
            }
        } else {
            ctx.response.status = 416;
            ctx.body = {
                code: 200,
                msg: '轮播id数组不能为空'
            }
        }
    }

    // 查询所有分页

    static async findAll(ctx) {
        //接收客服端
        let req = ctx.request.body;
        try {
            //创建文章模型
            const data = await CarouselModel.finAll(req);
            ctx.response.status = 200;
            ctx.body = {
                code: 200,
                data: data,
                des: '查找所所有成功',
            }
        } catch (err) {
            ctx.response.status = 412;
            ctx.body = {
                code: 412,
                msg: '查找所有异常',
                des: err
            }
        }
    }

    static async queryCarousel(ctx) {
        //接收客服端
        let req = ctx.request.body;
        try {
            //创建文章模型
            const data = await CarouselModel.queryCarousel(req.active);
            if (data) {
                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    data: data,
                    des: '当前次序已经存在',
                    state: 1
                }

            } else {
                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    data: data,
                    des: '可以进行添加',
                    state: 0
                }

            }

        } catch (err) {
            ctx.response.status = 412;
            ctx.body = {
                code: 412,
                msg: '调整次数异常',
                des: err
            }
        }
    }

}

module.exports = CarouselController;