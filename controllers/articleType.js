const ArticleTypeModel = require("../modules/articleType");

class ArticleTypeController {
    /**
     * 创建文章
     * @param ctx
     * @returns {Promise.<void>}
     */
    static async create(ctx) {
        //接收客服端
        let req = ctx.request.body;
        if (req.categoryName && req.categoryCreater) {
            try {
                //创建文章模型
                const ret = await ArticleTypeModel.createArticleType(req);
                //使用刚刚创建的文章ID查询文章详情，且返回文章详情信息
                const data = await ArticleTypeModel.getArticleTypeDetail(ret.id);

                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    articleType:data,
                    des: '创建文章类别成功',
                }
            } catch (err) {
                ctx.response.status = 412;
                ctx.body = {
                    code: 412,
                    msg: '创建文章类别失败',
                    des: err
                }
            }
        } else {
            ctx.response.status = 416;
            ctx.body = {
                code: 200,
                msg: '参数不齐全'
            }
        }
    }
    static async updata(ctx) {
        //接收客服端
        let req = ctx.request.body;
        if (req.id) {
            try {
                //创建文章模型
                await ArticleTypeModel.upDataArticleType(req);
                const data = await ArticleTypeModel.getArticleTypeDetail(req.id);
                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    articleType:data,
                    des: '更新文章类别成功',
                }
            } catch (err) {
                ctx.response.status = 412;
                ctx.body = {
                    code: 412,
                    msg: '更新文章类别失败',
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

    // 删除文章类别

    static async del(ctx) {
        //接收客服端
        let req = ctx.request.body;
        if (req.id) {
            try {
                //创建文章模型
                const data=await ArticleTypeModel.delArticleType(req.id);
                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    articleType:data,
                    des: '删除文章类别成功',
                }
            } catch (err) {
                ctx.response.status = 412;
                ctx.body = {
                    code: 412,
                    msg: '删除文章类别失败',
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

    // 批量删除操作

    static async batchDel(ctx) {
        //接收客服端
        let req = ctx.request.body;
        if (req.batchList) {
            try {
                //创建文章模型
                const data=await ArticleTypeModel.bacthDel(req.batchList);
                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    articleType:data,
                    des: '批量删除文章类别成功',
                }
            } catch (err) {
                ctx.response.status = 412;
                ctx.body = {
                    code: 412,
                    msg: '批量删除文章类别失败',
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

    // 查询所有分页

    static async findAll(ctx) {
        //接收客服端
        let req = ctx.request.body;
        if (req.currentPage && req.pageSize) {
            try {
                //创建文章模型
                const data = await ArticleTypeModel.finAllArticleType(req);
                ctx.response.status = 200;
                ctx.body = {
                    code: 200,
                    articleType:data,
                    des: '查找所有文章类别成功',
                }
            } catch (err) {
                ctx.response.status = 412;
                ctx.body = {
                    code: 412,
                    msg: '查找所有文章类别异常',
                    des: err
                }
            }
        } else {
            ctx.response.status = 416;
            ctx.body = {
                code: 200,
                msg: '参数不齐全'
            }
        }
    }
}

module.exports = ArticleTypeController;