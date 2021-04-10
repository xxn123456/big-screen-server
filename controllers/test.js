const BlogModel = require('../modules/blog.js')




class BlogController {

    // 分页

    static async findAll(ctx) {
        let req = ctx.request.body;

        let  data = await BlogModel.findAll(req);
        ctx.response.status = 200;
        ctx.body = {
            code: 200,
            msg: '查找文章成功',
            data
        }
    


    }

  

}
module.exports = BlogController